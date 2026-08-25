interface PostCardProps {
  title: string;
  slug: string;
  image: string;
  tag?: string;
  tagColor?: "red" | "yellow" | "green" | "purple";
  excerpt?: string;
  publishedAt?: string;
}

const tagStyles = {
  red: "bg-primary-soft text-primary",
  yellow: "bg-accent-soft text-accent-dark",
  green: "bg-success-soft text-success",
  purple: "bg-info-soft text-info",
};

export default function PostCard({
  title,
  slug,
  image,
  tag,
  tagColor = "red",
  excerpt,
  publishedAt,
}: PostCardProps) {
  return (
    <article className="group">
      <a href={`/blog/${slug}`} className="block">
        {/* Image */}
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-surface-muted">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="mt-3 space-y-2">
          {tag && (
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                tagStyles[tagColor]
              }`}
            >
              {tag}
            </span>
          )}

          <h3 className="line-clamp-2 text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          {excerpt && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {excerpt}
            </p>
          )}

          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="block text-xs text-muted-light"
            >
              {new Date(publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
        </div>
      </a>
    </article>
  );
}
