import supabaseServerClient from "@/lib/clients/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return NextResponse.json(
      {
        message:
          error.code === "invalid_credentials"
            ? "שגיאה בניסיון ההתחברות, ודא שאימייל וסיסמא נכונים"
            : "שגיאת תקשורת כללית עם השרתים",
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ data });
};
