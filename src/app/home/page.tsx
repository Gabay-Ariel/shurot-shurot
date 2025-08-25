import Image from "next/image";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string; width: number; height: number } };
  };
}

interface YouTubeResponse {
  items: Video[];
}

// פונקציה ל-fetch סרטוני YouTube
async function fetchYouTubeVideos(
  query: string,
  apiKey: string
): Promise<Video[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&key=${apiKey}&maxResults=5&type=video`
  );

  if (!res.ok) {
    console.error("YouTube API error:", await res.text());
    return [];
  }

  const data: YouTubeResponse = await res.json();
  return data.items;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return <div>Missing YouTube API key</div>;

  // קבלת שאילתא מה-URL (Server-side)
  const query = searchParams?.query || "funny cats";

  let videos: Video[] = [];
  try {
    videos = await fetchYouTubeVideos(query, apiKey);
  } catch (e) {
    console.error(e);
  }

  const selectedVideoId = videos[0]?.id.videoId || "HC3IcsvbxYU"; // fallback לסרטון חינמי

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">חיפוש YouTube</h1>

      {/* טופס חיפוש GET */}
      <form method="get" className="flex mb-6">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="הכנס מילת חיפוש..."
          className="flex-1 p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          חפש
        </button>
      </form>

      {/* נגן הסרטון הראשי */}
      <div className="mb-6">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${selectedVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* רשימת תוצאות */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((item) => (
          <div key={item.id.videoId} className="border rounded p-2">
            <a
              href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={item.snippet.thumbnails.medium.url}
                alt={item.snippet.title}
                width={item.snippet.thumbnails.medium.width}
                height={item.snippet.thumbnails.medium.height}
                className="rounded mb-2"
              />
              <p className="text-sm font-semibold">{item.snippet.title}</p>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
