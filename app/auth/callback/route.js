import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = ["student", "industry", "academician", "institution"];

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const { user } = data;

      // 1. If this was a password recovery callback, forward directly to reset-password
      if (nextParam && nextParam.startsWith("/reset-password")) {
        return NextResponse.redirect(`${origin}${nextParam}`);
      }

      // 2. Check if user already has an established profile and role
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, role, full_name")
        .eq("id", user.id)
        .maybeSingle();

      const mode = searchParams.get("mode") || "login";
      const queryRole = searchParams.get("role");

      const resolvedRole =
        existingProfile?.role ||
        (mode === "signup" ? (queryRole || user.user_metadata?.role) : null);

      // If user came through LOGIN flow but has no registered profile/role, reject and redirect to role selection to sign up
      if (mode === "login" && (!resolvedRole || !VALID_ROLES.includes(resolvedRole))) {
        await supabase.auth.signOut();
        const msg = encodeURIComponent(
          "No registered account found with this Google email. Please select your role to sign up."
        );
        return NextResponse.redirect(`${origin}/select-role?intent=signup&error=${msg}`);
      }

      const assignedRole = resolvedRole && VALID_ROLES.includes(resolvedRole) ? resolvedRole : (queryRole || "student");
      const userFullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        existingProfile?.full_name ||
        user.email?.split("@")[0] ||
        "User";

      // 3. Upsert base profile info while preserving or updating role
      await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          full_name: userFullName,
          avatar_url:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null,
          role: assignedRole,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      // 4. Determine destination
      if (nextParam && nextParam !== "/student") {
        return NextResponse.redirect(`${origin}${nextParam}`);
      }

      // Take user to their role dashboard
      return NextResponse.redirect(`${origin}/${assignedRole}`);
    }
  }

  // Return to login with error if auth failed
  const errorDescription = searchParams.get("error_description") || "auth_failed";
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(errorDescription)}`
  );
}
