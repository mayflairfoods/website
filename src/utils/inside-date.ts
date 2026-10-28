const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatStoryDate = (iso: string): string =>
  fmt.format(new Date(iso));
