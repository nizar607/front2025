import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as CartActions from './cart.action';
import { CartService } from '../../core/services/cart/cart.service';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCart),
      mergeMap(() =>
        this.cartService.getCart().pipe(
          map(cart => CartActions.getCartSuccess({ cart })),
          catchError(error => of(CartActions.getCartFailure({ error: error.message })))
        )
      )
    )
  );

  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItemToCart),
      mergeMap(action =>
        this.cartService.addItemToCart(action.articleId, action.quantity).pipe(
          map(cart => CartActions.addItemToCartSuccess({ cart })),
          catchError(error => of(CartActions.addItemToCartFailure({ error: error.message })))
        )
      )
    )
  );

  removeItemFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItemFromCart),
      mergeMap(action =>
        this.cartService.removeItemFromCart(action.itemId).pipe(
          map(cart => CartActions.removeItemFromCartSuccess({ cart })),
          catchError(error => of(CartActions.removeItemFromCartFailure({ error: error.message })))
        )
      )
    )
  );

  updateItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateItemQuantity),
      mergeMap(action =>
        this.cartService.updateItemQuantity(action.itemId, action.quantity).pipe(
          map(cart => CartActions.updateItemQuantitySuccess({ cart })),
          catchError(error => of(CartActions.updateItemQuantityFailure({ error: error.message })))
        )
      )
    )
  );



  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      mergeMap(() =>
        this.cartService.clearCart().pipe(
          map(cart => CartActions.clearCartSuccess({ cart })),
          catchError(error => of(CartActions.clearCartFailure({ error: error.message })))
        )
      )
    )
  );
}