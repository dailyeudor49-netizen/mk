
import { ReactNode } from 'react';

export interface Testimonial {
  name: string;
  source: string;
  rating: number;
  text: string;
  gender: 'M' | 'F';
}

export interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
  image: string;
}

export interface Step {
  step: number | string;
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
}

export interface PromoItem {
  icon: ReactNode;
  title: string;
  desc: string;
}
