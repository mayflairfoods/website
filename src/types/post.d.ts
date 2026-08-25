export interface PostCategory {
  _id: string;
  title: string;
  slug?: string;
}

export interface PostAuthor {
  name?: string;
  image?: unknown;
}

export interface Post {
  title: string;
  slug?: {
    current: string;
  };
  publishedAt?: string;

  author?: PostAuthor;

  mainImage?: {
    url?: string;
    alt?: string;
  };

  categories?: PostCategory[];

  tags?: string[];

  body?: any;
}
