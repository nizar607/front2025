import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';


export interface CartState {
  cart: any;
  loading: boolean;
  error: any;
}

export const initialState: CartState = {
  cart: null,
  loading: false,
  error: null
};

export const CartReducer = createReducer(
  initialState,

  // Get Cart
  on(CartActions.getCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.getCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
    error: null
  })),
  on(CartActions.getCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Item to Cart
  on(CartActions.addItemToCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.addItemToCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
    error: null
  })),
  on(CartActions.addItemToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Remove Item from Cart
  on(CartActions.removeItemFromCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.removeItemFromCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
    error: null
  })),
  on(CartActions.removeItemFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Item Quantity
  on(CartActions.updateItemQuantity, (state) => ({
    ...state,
    loading: false,
    error: null
  })),
  on(CartActions.updateItemQuantitySuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
    error: null
  })),
  on(CartActions.updateItemQuantityFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Cart
  on(CartActions.clearCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.clearCartSuccess, (state, { cart }) => ({
    ...state,
    cart,
    loading: false,
    error: null
  })),
  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


);

// Selector
export function reducer(state: CartState | undefined, action: Action) {
  return CartReducer(state, action);
}