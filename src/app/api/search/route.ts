// src/app/api/youtube-search/route.ts
import { NextRequest, NextResponse } from "next/server";

type YouTubeApiItem = {
  id: { videoId: string };
};

type YouTubeApiResponse = {
  items: YouTubeApiItem[];
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=${encodeURIComponent(
    query
  )}&key=${apiKey}&type=video`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "YouTube API error" }, { status: 500 });
  }

  const data: YouTubeApiResponse = await res.json();
  if (data.items.length === 0) {
    return NextResponse.json({ error: "No results" }, { status: 404 });
  }

  return NextResponse.json({ videoId: data.items[0].id.videoId });
}
