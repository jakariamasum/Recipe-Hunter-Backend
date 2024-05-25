export interface Recipe {
  name: string;
  image: string;
  details: string;
  video: string;
  country: string;
  category: string;
  creatorEmail: string;
  watchCount?: number;
  purchased_by?: string[];
}
