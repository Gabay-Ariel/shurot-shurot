"use client";

import { useState } from "react";

export default function YouTubeSearchPage() {
  const [query, setQuery] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok || !data.videoId) {
        setVideoId(null);
        setError(data.error || "שגיאה בחיפוש");
      } else {
        setVideoId(data.videoId);
      }
    } catch {
      setError("שגיאה בחיבור לשרת");
      setVideoId(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>חיפוש שירים</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="שם השיר או האמן"
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          חפש
        </button>
      </form>

      {loading && <p>טוען...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {videoId && (
        <iframe
          width="100%"
          height={400}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={query}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </main>
  );
}
