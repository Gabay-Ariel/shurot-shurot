import Image from "next/image";

// The Video and YouTubeResponse interfaces are correct.
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

// This function is also correct.
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

// The main component with corrected prop types.
export default async function HomePage({
  searchParams,
}: {
  // This is the corrected type for searchParams in the App Router.
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Safely handle the query, ensuring it's a string.
  const queryValue = searchParams?.query;
  const query = Array.isArray(queryValue)
    ? queryValue[0]
    : queryValue || "funny cats";

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return (
      <div className="text-center text-red-500">Missing YouTube API key</div>
    );
  }

  let videos: Video[] = [];
  try {
    // Ensure query is a string before passing to the fetch function.
    if (typeof query === "string") {
      videos = await fetchYouTubeVideos(query, apiKey);
    }
  } catch (e) {
    console.error(e);
    // Optionally, show an error message in the UI
    return (
      <div className="text-center text-red-500">Failed to fetch videos.</div>
    );
  }

  const selectedVideoId = videos[0]?.id.videoId || "HC3IcsvbxYU"; // Default video

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        חיפוש YouTube
      </h1>

      {/* Search Form */}
      <form method="get" className="flex mb-6 shadow-md rounded-lg">
        <input
          type="text"
          name="query"
          placeholder="הכנס מילת חיפוש..."
          defaultValue={query}
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          dir="rtl"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          חפש
        </button>
      </form>

      {/* Main Video Player */}
      <div className="mb-8 shadow-lg rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Results List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.length > 0 ? (
          videos.map((item) => (
            <div
              key={item.id.videoId}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                // This link will now change the main video player
                href={`/?query=${encodeURIComponent(query)}&videoId=${
                  item.id.videoId
                }`}
                // The target="_blank" is removed to allow same-page navigation
              >
                <div className="relative w-full h-auto mb-2">
                  <Image
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    width={item.snippet.thumbnails.medium.width}
                    height={item.snippet.thumbnails.medium.height}
                    className="rounded-md object-cover"
                    layout="responsive"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700" dir="rtl">
                  {item.snippet.title}
                </p>
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No videos found for "{query}".
          </p>
        )}
      </div>
    </main>
  );
}
