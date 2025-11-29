export enum Mode {
  HEATING = 'HEATING',
  COOLING = 'COOLING',
  PURIFYING = 'PURIFYING',
  DEHUMIDIFYING = 'DEHUMIDIFYING'
}

export interface ReviewType {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  highlight: string; // The "bold" part of the review
  verified: boolean;
  timeAgo: string;
}

export interface OrderFormState {
  fullName: string;
  fullAddress: string; // Combined Address, City, Zip
  phone: string;
}