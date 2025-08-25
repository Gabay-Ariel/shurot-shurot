import Image from "next/image";

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string; width: number; height: number } };
  };
};

// פונקציה שמבצעת חיפוש ל־YouTube API בצד שרת
async function searchVideos(query: string): Promise<Video[]> {
  if (!query) return [];

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${process.env.YOUTUBE_API_KEY}`,
    { cache: "no-store" } // כדי שלא יטען מה-cache
  );

  const data = await res.json();
  return data.items;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const results = query ? await searchVideos(query) : [];
  const selectedVideoId = results.length > 0 ? results[0].id.videoId : null;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* שורת חיפוש */}
      <form className="flex mb-4" method="GET">
        <input
          type="text"
          name="query"
          placeholder="הכנס מילת חיפוש..."
          className="flex-1 p-2 border rounded-l"
          defaultValue={query}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          חפש
        </button>
      </form>

      {/* חלון הוידאו */}
      {selectedVideoId ? (
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
      ) : (
        <p>חפש סרטון כדי להציג כאן</p>
      )}

      {/* תוצאות חיפוש */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((item) => (
          <div key={item.id.videoId} className="border rounded p-2">
            <Image
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              width={item.snippet.thumbnails.medium.width}
              height={item.snippet.thumbnails.medium.height}
              className="rounded mb-2"
            />
            <p className="text-sm font-semibold">{item.snippet.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
