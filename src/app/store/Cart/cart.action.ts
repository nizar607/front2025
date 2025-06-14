import { createAction, props } from '@ngrx/store';
import { Cart, CartItem } from './cart.model';

// Get Cart Actions
export const getCart = createAction('[Cart] Get Cart');
export const getCartSuccess = createAction(
  '[Cart] Get Cart Success',
  props<{ cart: Cart }>()
);
export const getCartFailure = createAction(
  '[Cart] Get Cart Failure',
  props<{ error: string }>()
);

// Add Item to Cart Actions
export const addItemToCart = createAction(
  '[Cart] Add Item to Cart',
  props<{ articleId: number; quantity: number }>()
);
export const addItemToCartSuccess = createAction(
  '[Cart] Add Item to Cart Success',
  props<{ cart: Cart }>()
);
export const addItemToCartFailure = createAction(
  '[Cart] Add Item to Cart Failure',
  props<{ error: string }>()
);

// Remove Item from Cart Actions
export const removeItemFromCart = createAction(
  '[Cart] Remove Item from Cart',
  props<{ itemId: number }>()
);
export const removeItemFromCartSuccess = createAction(
  '[Cart] Remove Item from Cart Success',
  props<{ cart: Cart }>()
);
export const removeItemFromCartFailure = createAction(
  '[Cart] Remove Item from Cart Failure',
  props<{ error: string }>()
);

// Update Item Quantity Actions
export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: number; quantity: number }>()
);
export const updateItemQuantitySuccess = createAction(
  '[Cart] Update Item Quantity Success',
  props<{ cart: Cart }>()
);
export const updateItemQuantityFailure = createAction(
  '[Cart] Update Item Quantity Failure',
  props<{ error: string }>()
);

// Clear Cart Actions
export const clearCart = createAction('[Cart] Clear Cart');
export const clearCartSuccess = createAction(
  '[Cart] Clear Cart Success',
  props<{ cart: Cart }>()
);
export const clearCartFailure = createAction(
  '[Cart] Clear Cart Failure',
  props<{ error: string }>()
);