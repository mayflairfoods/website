import { PortableText } from "@portabletext/react";

interface PostBodyProps {
  value: any;
}

// Helper to extract image URL directly from Sanity asset reference (e.g., "image-abc123xyz-800x600-jpg")
function urlFor(source: any) {
  if (!source?.asset?._ref) return "";
  const ref = source.asset._ref;
  const parts = ref.split("-");
  if (parts.length < 4) return "";

  const [, id, dimensions, extension] = parts;
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID; // Swap to process.env.NEXT_PUBLIC_SANITY_PROJECT_ID if using Next.js
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
}

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value);
      if (!imageUrl) return null;

      return (
        <figure className="my-8 overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={value.alt || "Blog post image"}
            className="w-full object-cover max-h-[500px]"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 leading-8 text-foreground-soft">{children}</p>
    ),

    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-10 text-2xl font-semibold">{children}</h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold">{children}</h3>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="my-8 border-l-4 border-primary pl-5 text-lg italic text-muted">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },

  marks: {
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export default function PostBody({ value }: PostBodyProps) {
  return <PortableText value={value} components={components} />;
}
