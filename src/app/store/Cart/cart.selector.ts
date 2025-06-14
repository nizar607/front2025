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

export const selectCartTotal = createSelector(
  selectCartSubtotal,
  selectCartItemsCount,
  (subtotal, itemsCount) => {
    const shippingCost = itemsCount > 0 ? 5 : 0;
    return subtotal + shippingCost;
  }
);

export const selectShippingCost = createSelector(
  selectCartItemsCount,
  (itemsCount) => itemsCount > 0 ? 5 : 0
);