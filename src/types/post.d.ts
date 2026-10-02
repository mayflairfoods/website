export interface Post {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  _updatedAt?: string;

  author?: {
    _id?: string;
    name?: string;
    image?: unknown;
  };

  mainImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
  };

  ogImage?: {
    asset?: {
      _ref?: string;
      _type?: string;
    };
    alt?: string;
  };

  categories?: Array<{
    _id: string;
    title: string;
    slug?: string;
  }>;

  tags?: string[];

  body?: unknown;
}
