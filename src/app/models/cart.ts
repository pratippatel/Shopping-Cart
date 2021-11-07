import { Product } from './product';

export interface Cart {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  hasPlaced: boolean;
  product: Product;
}
