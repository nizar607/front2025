import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Cart, CartItem } from 'src/app/store/Cart/cart.model';
import * as CartActions from 'src/app/store/Cart/cart.action';
import * as CartSelectors from 'src/app/store/Cart/cart.selector';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  cart$: Observable<Cart | null>;
  cartItems$: Observable<CartItem[]>;
  cartLoading$: Observable<boolean>;
  cartError$: Observable<string | null>;
  cartItemsCount$: Observable<number>;
  cartSubtotal$: Observable<number>;
  cartTotal$: Observable<number>;
  shippingCost$: Observable<number>;
  
  showSuccessMessage = false;

  constructor(private store: Store, private router: Router) {
    this.cart$ = this.store.select(CartSelectors.selectCart);
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartLoading$ = this.store.select(CartSelectors.selectCartLoading);
    this.cartError$ = this.store.select(CartSelectors.selectCartError);
    this.cartItemsCount$ = this.store.select(CartSelectors.selectCartItemsCount);
    this.cartSubtotal$ = this.store.select(CartSelectors.selectCartSubtotal);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.shippingCost$ = this.store.select(CartSelectors.selectShippingCost);
  }

  ngOnInit() {
    this.loadCart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCart() {
    this.store.dispatch(CartActions.getCart());
  }

  addToBasket(articleId: number, quantity: number = 1) {
    this.store.dispatch(CartActions.addItemToCart({ articleId, quantity }));
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
  }

  removeFromBasket(itemId: number) {
    this.store.dispatch(CartActions.removeItemFromCart({ itemId }));
  }

  clearBasket() {
    this.store.dispatch(CartActions.clearCart());
  }

  updateQuantity(itemId: number, change: number) {
    // Get current cart items synchronously from the store
    let currentItems: any[] = [];
    this.cartItems$.pipe(take(1)).subscribe(items => {
      currentItems = items;
    });
    
    const item = currentItems.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        this.store.dispatch(CartActions.updateItemQuantity({ itemId, quantity: newQuantity }));
      } else {
        this.removeFromBasket(itemId);
      }
    }
  }

  proceedToCheckout() {
    // Navigate to checkout page
    this.router.navigate(['/checkout']);
  }

  continueShopping() {
    this.router.navigate(['/client/articles']);
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

}
