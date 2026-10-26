import { PortableText } from "@portabletext/react";

interface PostBodyProps {
  value: any;
}

function urlFor(source: any) {
  if (!source?.asset?._ref) return "";
  const ref = source.asset._ref;
  const parts = ref.split("-");
  if (parts.length < 4) return "";

  const [, id, dimensions, extension] = parts;
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
}

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value);
      if (!imageUrl) return null;

      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
          <img
            src={imageUrl}
            alt={value.alt || "MayFlair blog image"}
            className="aspect-video w-full rounded-xl object-cover max-h-[500px]"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-xs font-medium italic text-neutral-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    // Normal Paragraphs: Consistent bottom margin & line height
    normal: ({ children }: any) => (
      <p className="mb-6 leading-[1.8] text-neutral-800 text-base sm:text-lg">
        {children}
      </p>
    ),

    // H1 Heading Spacing
    h1: ({ children }: any) => (
      <h1 className="mt-12 mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl leading-tight">
        {children}
      </h1>
    ),

    // H2 Heading Spacing: Clear top gap (mt-10) and compact gap to text (mb-3)
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl border-b border-neutral-100 pb-2">
        {children}
      </h2>
    ),

    // H3 Heading Spacing: Distinct separation above (mt-8) and tight gap to body (mb-2)
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-neutral-900 sm:text-2xl">
        {children}
      </h3>
    ),

    // Blockquote Spacing
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 rounded-r-xl border-l-4 border-red-700 bg-neutral-50 py-4 pl-6 pr-4 text-lg italic text-neutral-700 shadow-xs">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 mt-2 list-disc space-y-2.5 pl-6 text-neutral-800 leading-relaxed">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-6 mt-2 list-decimal space-y-2.5 pl-6 text-neutral-800 leading-relaxed">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),

    em: ({ children }: any) => <em className="italic">{children}</em>,

    link: ({ value, children }: any) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-red-700 font-medium underline underline-offset-4 transition-colors hover:text-red-800"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PostBody({ value }: PostBodyProps) {
  return (
    <div className="prose-direct max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
