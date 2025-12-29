import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

export type MediaType = 'image' | 'video';

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  media: string;
  mediaType: MediaType;
  description: string;
}

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Golden Sunset Reflections",
    artist: "Elena Morisot",
    year: "2023",
    media: artwork1,
    mediaType: 'image',
    description: "An impressionist masterpiece capturing the serene beauty of a sunset over still waters."
  },
  {
    id: 2,
    title: "Geometric Harmony",
    artist: "Marcus Chen",
    year: "2024",
    media: artwork2,
    mediaType: 'image',
    description: "Bold contemporary abstract exploring the interplay of form and color."
  },
  {
    id: 3,
    title: "Ocean Dreams",
    artist: "Digital Arts Collective",
    year: "2024",
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
    mediaType: 'video',
    description: "A mesmerizing video installation exploring the rhythm of ocean waves."
  },
  {
    id: 4,
    title: "Zen Garden Meditation",
    artist: "Takeshi Yamamoto",
    year: "2023",
    media: artwork4,
    mediaType: 'image',
    description: "Minimalist Japanese aesthetics capturing the essence of tranquility."
  },
  {
    id: 5,
    title: "Alpine Majesty",
    artist: "Hans Mueller",
    year: "2024",
    media: artwork5,
    mediaType: 'image',
    description: "Dramatic landscape depicting the raw power of mountain wilderness."
  },
  {
    id: 6,
    title: "Nature in Motion",
    artist: "Studio Kinetic",
    year: "2024",
    media: "https://www.w3schools.com/html/movie.mp4",
    mediaType: 'video',
    description: "A captivating video piece celebrating the beauty of natural movement."
  }
];
