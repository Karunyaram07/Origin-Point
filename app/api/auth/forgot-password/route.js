import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = createAdminClient();

    // Check if user exists
    const { data: userList, error: listError } = await admin.auth.admin.listUsers();
    if (listError) {
      return NextResponse.json(
        { error: listError.message || "Failed to search user directory." },
        { status: 500 }
      );
    }

    const user = userList?.users?.find(
      (u) => u.email?.toLowerCase() === normalizedEmail
    );

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No account found with this email address. Please make sure the email is typed correctly or create a new account.",
        },
        { status: 404 }
      );
    }

    // Generate recovery link using admin client (bypasses broken SMTP mailer)
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "localhost:3000";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const redirectUrl = `${protocol}://${host}/auth/callback?next=/reset-password`;

    const { data: linkData, error: linkError } =
      await admin.auth.admin.generateLink({
        type: "recovery",
        email: normalizedEmail,
        options: {
          redirectTo: redirectUrl,
        },
      });

    if (linkError) {
      return NextResponse.json(
        { error: linkError.message || "Failed to generate recovery link." },
        { status: 500 }
      );
    }

    const actionLink = linkData?.properties?.action_link;
    const isGoogle = user.app_metadata?.provider === "google";

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      actionLink: actionLink,
      isGoogle: isGoogle,
      message: isGoogle
        ? "This account was originally registered with Google. You can use the link below to create an email password."
        : "Password reset link generated successfully.",
    });
  } catch (err) {
    console.error("Forgot password route error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
