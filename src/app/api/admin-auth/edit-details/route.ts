import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "@/lib/clients/supabaseServerClient";

export const PUT = async (req: NextRequest) => {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "חסרים הרשאות" }, { status: 401 });
  }

  const body = await req.json();
  if (!!body.password) {
    const { error } = await supabase.auth.updateUser({
      password: body.password,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else if (!!body.metadata) {
    if (typeof body.metadata !== "object" || Array.isArray(body.metadata)) {
      return NextResponse.json(
        { error: "Invalid metadata format" },
        { status: 400 }
      );
    }
    const { error } = await supabase.auth.updateUser({
      data: body.metadata,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "לא סופק פרמטר" }, { status: 400 });
  }
  return NextResponse.json({ success: true });
};
