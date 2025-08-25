// src/app/home/page.tsx
import React from "react";

type YouTubeApiItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
  };
};

type YouTubeApiResponse = {
  items: YouTubeApiItem[];
};

const fetchYouTubeVideo = async (query: string): Promise<string | null> => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not defined");
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
    query
  )}&key=${apiKey}&type=video`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("YouTube API Error:", res.status, await res.text());
    return null;
  }

  const data: YouTubeApiResponse = await res.json();
  if (data.items.length === 0) return null;

  return data.items[0].id.videoId;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || "";

  if (!query) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>חיפוש שירים ביוטיוב</h1>
        <p>הכנס חיפוש בשורת הכתובת: ?q=שם+שיר</p>
      </main>
    );
  }

  const videoId = await fetchYouTubeVideo(query);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>חיפוש שירים ביוטיוב</h1>
      {videoId ? (
        <iframe
          width="100%"
          height={400}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={query}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>לא נמצאו תוצאות עבור &quot;{query}&quot;</p>
      )}
    </main>
  );
}
