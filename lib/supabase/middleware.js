import { createServerClient } from "@supabase/ssr";

const fallbackUrl = "https://giisvqrencknoofjpntm.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpaXN2cXJlbmNrbm9vZmpwbnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjI1MDYsImV4cCI6MjEwNDQzODUwNn0.csltcAPAqNiAH1hHY_fan2HGh4fLiwB5i0CqmRCaxzw";

export function createMiddlewareClient(request, response) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || fallbackUrl;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || fallbackKey;

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}
