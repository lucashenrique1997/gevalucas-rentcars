export interface Rent {
  id: number;
  userId: number;
  carId: number;
  initialRent: string;
  days: number;
  realInitialRent: string;
  endRent: string
  responsibleUserId: number;
  price: number;
  notes: string;
  car: string;
  category: string;
}
