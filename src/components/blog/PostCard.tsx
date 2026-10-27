interface PostCardProps {
  title: string;
  slug: string;
  image: string;
  tag?: string;
  tagColor?: "red" | "yellow" | "green" | "purple";
  excerpt?: string;
  publishedAt?: string;
}

// const tagStyles = {
//   red: "bg-primary-soft text-primary",
//   yellow: "bg-accent-soft text-accent-dark",
//   green: "bg-success-soft text-success",
//   purple: "bg-info-soft text-info",
// };

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
        <div className="aspect-square overflow-hidden rounded-3xl bg-surface-muted">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="mt-4 space-y-1">
          {tag && (
            <span
              className={`text-xs md:text-sm font-medium block text-primary`}
            >
              {tag}
            </span>
          )}

          <h3 className="line-clamp-2 text-xl md:text-2xl font-medium text-foreground leading-12 transition-colors group-hover:text-primary">
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
              className="block text-xs md:text-sm mt-1 text-muted-light"
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
