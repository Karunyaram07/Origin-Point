import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and new password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const admin = createAdminClient();

    // Find user by email
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
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Update user's password directly via admin API
    const { data: updateData, error: updateError } =
      await admin.auth.admin.updateUserById(user.id, {
        password: password,
        email_confirm: true,
      });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to update password." },
        { status: 500 }
      );
    }

    // Also update profile updated_at
    try {
      await admin
        .from("profiles")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", user.id);
    } catch (profileErr) {
      console.warn("Could not update profile timestamp:", profileErr);
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully in database.",
    });
  } catch (err) {
    console.error("Reset password route error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
