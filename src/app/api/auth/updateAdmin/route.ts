// /app/api/user/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "@/lib/clients/supabaseServerClient";

export async function POST(req: NextRequest) {
  try {
    const supabase = await supabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { password, metadata } = body;

    const fieldsProvided = [
      password !== undefined,
      metadata !== undefined,
    ].filter(Boolean).length;

    if (fieldsProvided === 0) {
      return NextResponse.json(
        { error: "No updatable field provided" },
        { status: 400 }
      );
    }

    if (fieldsProvided > 1) {
      return NextResponse.json(
        { error: "Only one field can be updated per request" },
        { status: 400 }
      );
    }

    if (password !== undefined) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    if (metadata !== undefined) {
      if (typeof metadata !== "object" || Array.isArray(metadata)) {
        return NextResponse.json(
          { error: "Invalid metadata format" },
          { status: 400 }
        );
      }

      const { error } = await supabase.auth.updateUser({
        data: metadata,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error || "Unknown error" },
      { status: 500 }
    );
  }
}
