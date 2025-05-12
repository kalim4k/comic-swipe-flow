
export interface Review {
  id: string;
  username: string;
  rating: number;
  message: string;
  timestamp: string;
  isUserGenerated?: boolean;
}
