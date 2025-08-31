import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state.cart
);

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart?.items || []
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

// Total should now be equal to subtotal, with no shipping fees added
export const selectCartTotal = createSelector(
  selectCartSubtotal,
  (subtotal) => subtotal
);

// Shipping cost has been removed from the calculation, keep selector for compatibility but always return 0
export const selectShippingCost = createSelector(
  selectCartItemsCount,
  () => 0
);