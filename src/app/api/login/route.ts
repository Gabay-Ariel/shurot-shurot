import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  const correctPassword = process.env.PASSWORD;

  if (password === correctPassword) {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ valid: false });
  }
}
