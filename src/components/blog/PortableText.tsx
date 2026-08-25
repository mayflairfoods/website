import { PortableText, type PortableTextComponents } from "@portabletext/react";

interface PortableTextBodyProps {
  value: any[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-8 text-foreground-soft">
        {children}
      </p>
    ),

    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-xl font-semibold tracking-tight">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary pl-5 text-lg italic leading-8 text-muted">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-7">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-base leading-7">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),

    em: ({ children }) => <em>{children}</em>,

    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary-dark"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextBody({ value }: PortableTextBodyProps) {
  return <PortableText value={value} components={components} />;
}
