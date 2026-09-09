// @ts-nocheck
import { createBrowserClient } from "@supabase/ssr";

const fallbackUrl = "https://giisvqrencknoofjpntm.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpaXN2cXJlbmNrbm9vZmpwbnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjI1MDYsImV4cCI6MjEwNDQzODUwNn0.csltcAPAqNiAH1hHY_fan2HGh4fLiwB5i0CqmRCaxzw";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;
  return createBrowserClient(url, key);
}

export const supabase = createClient();
