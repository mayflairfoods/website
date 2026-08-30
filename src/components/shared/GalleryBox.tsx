import { useEffect, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  {
    src: "/images/home/slides/1.webp",
    alt: "Mayflair customers sharing a meal",
  },
  {
    src: "/images/home/slides/2.webp",
    alt: "Fresh Mayflair food",
  },
  {
    src: "/images/home/slides/3.webp",
    alt: "A Mayflair pasta dish",
  },
  {
    src: "/images/home/slides/4.webp",
    alt: "Freshly prepared Mayflair food",
  },
  {
    src: "/images/home/slides/5.webp",
    alt: "Fresh Mayflair bread",
  },
  {
    src: "/images/home/slides/6.webp",
    alt: "A Mayflair burger and fries",
  },
];

const topRow = images.slice(0, 3);
const bottomRow = images.slice(3, 6);

interface ImageRowProps {
  images: GalleryImage[];
  direction: "left" | "right";
  onSelect: (image: GalleryImage) => void;
}

function ImageRow({ images, direction, onSelect }: ImageRowProps) {
  return (
    <div className="gallery-row" data-direction={direction}>
      <div className="gallery-track">
        {/* Original images */}
        <div className="gallery-set">
          {images.map((image) => (
            <button
              key={image.src}
              type="button"
              className="gallery-image"
              onClick={() => onSelect(image)}
              aria-label={`View ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>

        {/* Duplicate images for seamless looping */}
        <div className="gallery-set" aria-hidden="true">
          {images.map((image) => (
            <div key={`duplicate-${image.src}`} className="gallery-image">
              <img src={image.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LightboxProps {
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function Lightbox({ activeIndex, onClose, onPrevious, onNext }: LightboxProps) {
  const image = images[activeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:right-7 sm:top-7"
      >
        ×
      </button>

      {/* Previous */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:left-7 sm:h-12 sm:w-12"
      >
        ←
      </button>

      {/* Image */}
      <div
        className="flex max-h-[85vh] max-w-[88vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20 sm:right-7 sm:h-12 sm:w-12"
      >
        →
      </button>

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function GalleryBox() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function openImage(image: GalleryImage) {
    setActiveIndex(images.findIndex((item) => item.src === image.src));
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0 ? images.length - 1 : current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === images.length - 1 ? 0 : current + 1;
    });
  }

  return (
    <>
      {/* Moving Gallery */}
      <div className="mt-10 space-y-1 bg-primary sm:mt-12 sm:space-y-2 py-1">
        <ImageRow images={topRow} direction="right" onSelect={openImage} />

        <ImageRow images={bottomRow} direction="left" onSelect={openImage} />
      </div>

      {activeIndex !== null && (
        <Lightbox
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}

      <style>{`
        .gallery-row {
          width: 100%;
          overflow: hidden;
        }

        .gallery-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        .gallery-set {
          display: flex;
          flex: none;
          gap: 0.25rem;
          padding-right: 0.25rem;
        }

        .gallery-image {
          position: relative;
          display: block;
          flex: none;
          width: clamp(240px, 32vw, 500px);
          aspect-ratio: 1.45 / 1;
          overflow: hidden;
          border: 0;
          border-radius: 1.5rem;
          padding: 0;
          background: var(--mf-surface-muted);
          cursor: pointer;
        }

        .gallery-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }

        .gallery-image:hover img {
          transform: scale(1.04);
        }

        [data-direction="left"] .gallery-track {
          animation: gallery-left 30s linear infinite;
        }

        [data-direction="right"] .gallery-track {
          animation: gallery-right 30s linear infinite;
        }

        .gallery-row:hover .gallery-track,
        .gallery-row:focus-within .gallery-track {
          animation-play-state: paused;
        }

        @keyframes gallery-left {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes gallery-right {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .gallery-set {
            gap: 0.5rem;
            padding-right: 0.5rem;
          }

          .gallery-image {
            width: 72vw;
            border-radius: 1.25rem;
          }

          [data-direction="left"] .gallery-track,
          [data-direction="right"] .gallery-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-track {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
