export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
  description: string;
  isAvailable: boolean;
  releated: IProduct[];
}
