// app/api/auth/signin/route.ts
import supabaseServerClient from "@/lib/clients/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const supabase = await supabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "error login" },
      { status: 500 }
    );
  }
};
