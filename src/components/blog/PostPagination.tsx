interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange?: (page: number) => void;
}

export default function PostPagination({
  currentPage,
  totalPages,
  onChange,
}: PostPaginationProps) {
  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;

    onChange?.(page);

    window.dispatchEvent(
      new CustomEvent("blog:page-change", {
        detail: page,
      }),
    );
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const active = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            aria-current={active ? "page" : undefined}
            className={[
              "flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors",
              active
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-foreground hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
      >
        →
      </button>
    </nav>
  );
}
