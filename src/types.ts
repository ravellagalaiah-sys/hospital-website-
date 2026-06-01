/**
 * Shared types for the DENTORA application
 */

export interface Service {
  id: string;
  priceTag: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  name: string;
  role: string;
  source: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  specialties: string[];
}
