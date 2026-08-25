import { useState } from "react";

export interface CategoryFilterItem {
  label: string;
  value: string;
}

interface CategoryFilterProps {
  categories: CategoryFilterItem[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [active, setActive] = useState("all");

  function handleChange(value: string) {
    setActive(value);

    window.dispatchEvent(
      new CustomEvent("blog:category-change", {
        detail: value,
      }),
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = active === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() => handleChange(category.value)}
            aria-pressed={isActive}
            className={[
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "border-primary-soft bg-primary-soft text-primary"
                : "border-border bg-white text-foreground hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
