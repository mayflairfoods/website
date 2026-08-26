import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  {
    src: "/images/about/life-1.jpg",
    alt: "Mayflair team sharing a meal",
  },
  {
    src: "/images/about/life-2.jpg",
    alt: "Fresh Mayflair food",
  },
  {
    src: "/images/about/life-3.jpg",
    alt: "Mayflair pasta",
  },
  {
    src: "/images/about/life-4.jpg",
    alt: "Mayflair burger and fries",
  },
  {
    src: "/images/about/life-5.jpg",
    alt: "Mayflair team member",
  },
  {
    src: "/images/about/life-6.jpg",
    alt: "Mayflair food",
  },
];

export default function LifeAtMayflair() {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <>
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-3xl">
              Life at Mayflair
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-6 text-muted">
              These principles guide how we treat our customers, support our
              teammates, and show up every single day.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-1 overflow-hidden rounded-2xl md:grid-cols-4">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                className="group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                aria-label={`View ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={images[activeImage].src}
            alt={images[activeImage].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
