// Sample content. Replace with your content collection or CMS when /inside/[slug] is built.

export type CategoryId =
  | 'inside-life'
  | 'aluta-and-chill'
  | 'community-story'
  | 'events';

export interface Category {
  id: CategoryId;
  label: string;
}

export const categories: Category[] = [
  { id: 'inside-life', label: 'Inside Life' },
  { id: 'aluta-and-chill', label: 'Aluta and Chill' },
  { id: 'community-story', label: 'Community Story' },
  { id: 'events', label: 'Events' },
];

export function categoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  author: string;
  campus: 'UNEC Campus' | 'Thinkers Corner' | 'Off-campus';
  publishedAt: string; // ISO date
  readMinutes: number;
  cover?: string;
  featured?: boolean;
}

export const stories: Story[] = [
  {
    slug: 'unec-night-class-survival-guide',
    title: 'Navigating UNEC Night Class: The Survival Guide',
    excerpt:
      'How to stay sharp, study well and refuel when the lecture hall lights are the only ones still on.',
    category: 'aluta-and-chill',
    author: 'Chidi O.',
    campus: 'UNEC Campus',
    publishedAt: '2026-10-25',
    readMinutes: 4,
    featured: true,
  },
  {
    slug: 'before-noon-inside-the-kitchen',
    title: 'Before Noon: Inside the Kitchen That Feeds the Campus',
    excerpt:
      'Prep starts before sunrise. A walk through the hours nobody sees.',
    category: 'inside-life',
    author: 'Inside MayFlair Team',
    campus: 'UNEC Campus',
    publishedAt: '2026-10-21',
    readMinutes: 6,
  },
  {
    slug: 'my-mum-environmental-sanitation',
    title: 'My Mum Almost Got Beaten for Missing Environmental Sanitation',
    excerpt:
      'Nigerians remember life under military rule, one Saturday morning at a time.',
    category: 'community-story',
    author: 'Stella Harrison',
    campus: 'Off-campus',
    publishedAt: '2026-05-15',
    readMinutes: 5,
  },
  {
    slug: 'local-spice-magic',
    title: 'Local Spice Magic: Ogbono, Ukwa and the Campus Plate',
    excerpt:
      'The ingredients that make a student meal taste like home.',
    category: 'inside-life',
    author: 'Inside MayFlair Team',
    campus: 'Thinkers Corner',
    publishedAt: '2026-10-14',
    readMinutes: 4,
  },
  {
    slug: 'freshers-week-thinkers-corner',
    title: "Freshers' Week at Thinkers Corner: What Actually Happened",
    excerpt:
      'Queues, music and a very loud Friday. The full recap.',
    category: 'events',
    author: 'Ada N.',
    campus: 'Thinkers Corner',
    publishedAt: '2026-10-09',
    readMinutes: 3,
  },
  {
    slug: 'staff-spotlight-flash-grill',
    title: 'Staff Spotlight: The Hands Behind the Flash Grill',
    excerpt:
      'Eleven years of early mornings, and she still knows every regular by name.',
    category: 'community-story',
    author: 'Inside MayFlair Team',
    campus: 'UNEC Campus',
    publishedAt: '2026-10-02',
    readMinutes: 5,
  },
  {
    slug: 'exam-season-playlist',
    title: 'The Exam Season Playlist, Ranked by Hall',
    excerpt:
      'Every hall swears by its own. We listened to all of them.',
    category: 'aluta-and-chill',
    author: 'Emeka T.',
    campus: 'UNEC Campus',
    publishedAt: '2026-09-27',
    readMinutes: 3,
  },
  {
    slug: 'central-store-5am',
    title: 'The 5 AM Run: Inside Our Central Store',
    excerpt:
      'How supplies reach every outlet before the first customer walks in.',
    category: 'inside-life',
    author: 'Inside MayFlair Team',
    campus: 'UNEC Campus',
    publishedAt: '2026-09-18',
    readMinutes: 7,
  },
];

export interface Video {
  id: string;
  kind: 'video' | 'short';
  title: string;
  meta: string;
  href: string;
}

export const videos: Video[] = [
  { id: 'ep2', kind: 'video', title: 'Ep. 2: Kitchen Ops', meta: '8:14', href: '#' },
  { id: 'flash-grill', kind: 'short', title: 'Flash Grill', meta: 'Short', href: '#' },
  { id: 'ep1', kind: 'video', title: 'Ep. 1: The Story So Far', meta: '6:40', href: '#' },
  { id: 'night-class', kind: 'short', title: 'Night Class Snacks', meta: 'Short', href: '#' },
  { id: 'central-store', kind: 'video', title: 'Central Store at 5 AM', meta: '9:02', href: '#' },
];
