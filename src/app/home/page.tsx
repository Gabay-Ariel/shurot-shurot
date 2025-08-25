"use client";

import { useState } from "react";
import Image from "next/image";

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string; width: number; height: number } };
  };
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const searchVideos = async () => {
    if (!query) return;

    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.items);
    if (data.items.length > 0) {
      setSelectedVideoId(data.items[0].id.videoId);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <p>+++++++</p>
      <iframe
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
        src="https://www.htrjhtrjh"
      ></iframe>
      <p>_____________</p>
      <div className="mb-6">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/HC3IcsvbxYU`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      {/* שורת חיפוש */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="הכנס מילת חיפוש..."
          className="flex-1 p-2 border rounded-l"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchVideos}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          חפש
        </button>
      </div>

      {/* חלון הוידאו */}
      {selectedVideoId ? (
        <div className="mb-6">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>נתיב</p>
      )}

      {/* תוצאות חיפוש */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((item) => (
          <div
            key={item.id.videoId}
            className="cursor-pointer border rounded p-2 hover:bg-gray-100"
            onClick={() => setSelectedVideoId(item.id.videoId)}
          >
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
