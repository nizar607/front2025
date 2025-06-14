export interface CartItem {
  id: number;
  articleId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  categoryName?: string;
}

export interface Cart {
  id?: number;
  userId?: number;
  items: CartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}