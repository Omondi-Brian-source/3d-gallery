import artwork1 from '@/assets/artwork-1.jpg';
import artwork2 from '@/assets/artwork-2.jpg';
import artwork3 from '@/assets/artwork-3.jpg';
import artwork4 from '@/assets/artwork-4.jpg';
import artwork5 from '@/assets/artwork-5.jpg';
import artwork6 from '@/assets/artwork-6.jpg';

export type MediaType = 'image' | 'video';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  media: string;
  mediaType: MediaType;
  description: string;
  category: string;
  features?: string[];
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Artisan Leather Bag",
    brand: "Luxe Crafts",
    price: 249.99,
    currency: "USD",
    media: artwork1,
    mediaType: 'image',
    description: "Handcrafted Italian leather bag with premium brass hardware. Perfect blend of elegance and functionality.",
    category: "Accessories",
    features: ["Genuine Italian Leather", "Brass Hardware", "Lifetime Warranty"],
    inStock: true
  },
  {
    id: 2,
    name: "Minimalist Watch",
    brand: "Chrono Design",
    price: 399.00,
    currency: "USD",
    media: artwork2,
    mediaType: 'image',
    description: "Swiss-made movement with sapphire crystal glass. Timeless design meets modern precision.",
    category: "Watches",
    features: ["Swiss Movement", "Sapphire Crystal", "Water Resistant 50m"],
    inStock: true
  },
  {
    id: 3,
    name: "Smart Home Hub",
    brand: "TechVision",
    price: 199.99,
    currency: "USD",
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
    mediaType: 'video',
    description: "Central control for your entire smart home ecosystem. Voice-enabled with stunning display.",
    category: "Electronics",
    features: ["Voice Control", "10-inch Display", "Compatible with 1000+ devices"],
    inStock: true
  },
  {
    id: 4,
    name: "Ceramic Vase Collection",
    brand: "Artisan Studio",
    price: 129.00,
    currency: "USD",
    media: artwork4,
    mediaType: 'image',
    description: "Hand-thrown ceramic vases inspired by Japanese minimalism. Each piece is unique.",
    category: "Home Decor",
    features: ["Handmade", "Food Safe Glaze", "Signed by Artist"],
    inStock: true
  },
  {
    id: 5,
    name: "Premium Headphones",
    brand: "SoundCraft",
    price: 349.00,
    currency: "USD",
    media: artwork5,
    mediaType: 'image',
    description: "Studio-quality audio with active noise cancellation. 40-hour battery life.",
    category: "Electronics",
    features: ["Active Noise Cancellation", "40hr Battery", "Hi-Res Audio"],
    inStock: false
  },
  {
    id: 6,
    name: "Product Demo Reel",
    brand: "Brand Showcase",
    price: 0,
    currency: "USD",
    media: "https://www.w3schools.com/html/movie.mp4",
    mediaType: 'video',
    description: "Experience our latest collection in motion. See the craftsmanship up close.",
    category: "Featured",
    features: ["HD Video", "Product Details", "Behind the Scenes"],
    inStock: true
  }
];
