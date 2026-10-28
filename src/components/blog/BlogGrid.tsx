import { useMemo, useState } from "react";
import PostCard from "./PostCard";

export interface BlogPost {
  title: string;
  slug: string;
  image?: string;
  tag?: string;
  publishedAt?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

export default function BlogGrid({ posts, categories, tags }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }

    return posts.filter((post) => post.tag === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      {/* Categories */}
      <div className="my-6 md:my-12 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm! md:text-base! font-medium font-display transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-[#424040]  hover:border-primary hover:text-primary"
              }`}
              aria-pressed={active}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} {...post} image={post.image ?? ""} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
