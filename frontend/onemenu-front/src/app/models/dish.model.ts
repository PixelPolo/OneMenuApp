export interface Dish {
  dishID?: string; // UUID
  name: string;
  description?: string;
  price: number;
  currency: string;
  dishTypeID: string;
  sessionID: string;
  userID: string;
}
