export interface Rent {
  id: number;
  userId: number;
  carId: number;
  initialRent: string;
  days: number;
  realInitialRent: string;
  endRent: string
  responsibleUserId: number;
}
