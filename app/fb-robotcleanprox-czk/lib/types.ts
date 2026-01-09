export interface Review {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
  hasImage: boolean;
  imageUrl?: string;
}

export interface BundleItem {
  name: string;
  quantity: number;
  iconName: string; // Mapping string to Lucide icon in component
}

export interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  notes?: string;
}