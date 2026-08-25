import { PortableText } from "@portabletext/react";

interface PostBodyProps {
  value: any;
}

const components = {
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
