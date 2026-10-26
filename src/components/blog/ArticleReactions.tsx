import React, { useState } from "react";

interface ArticleReactionsProps {
  postId: string;
  initialClaps?: number;
}

export default function ArticleReactions({
  postId,
  initialClaps = 0,
}: ArticleReactionsProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [hasSnapped, setHasSnapped] = useState(false);

  const handleClap = async () => {
    // Optimistic UI increment
    setClaps((prev) => prev + 1);
    setHasSnapped(true);

    try {
      await fetch("/api/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
    } catch (err) {
      console.error("Failed to update claps in Sanity", err);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <button
        onClick={handleClap}
        className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
          hasSnapped
            ? "border-red-600 bg-red-50 text-red-600"
            : "border-neutral-200 bg-white hover:border-black text-neutral-700 shadow-sm"
        }`}
      >
        <span>👏</span>
        <span className="font-bold">{claps}</span> Claps
      </button>

      <div className="text-xs text-neutral-400">
        Click to applaud this story
      </div>
    </div>
  );
}
