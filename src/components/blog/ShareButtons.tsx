import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({
        title,
        url,
      });

      return;
    }

    await copyLink();
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
      >
        f
      </a>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
      >
        w
      </a>

      <button
        type="button"
        onClick={share}
        aria-label="Share article"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
      >
        ↗
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy article link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
      >
        {copied ? "✓" : "⧉"}
      </button>
    </div>
  );
}
