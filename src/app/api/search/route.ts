import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ items: [] });
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      q
    )}&key=AIzaSyAfy_RtNVhbZz5CE0xnMDfUY5LtsNwR9mw`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
