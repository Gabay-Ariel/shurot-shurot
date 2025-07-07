import supabaseServerClient from "@/lib/clients/supabaseServerClient";
import { NextResponse } from "next/server";

export const POST = async () => {
  const supabase = await supabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json(
      { message: "שגיאת תקשורת כללית עם השרתים" },
      { status: 400 }
    );
  }
  return NextResponse.json({ success: true });
};
