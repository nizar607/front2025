import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { Cart } from '../../../store/Cart/cart.model';

const API_URL = GlobalComponent.API_URL + 'cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {
  }

  /**
   * Get cart
   */
  getCart(): Observable<Cart> {
    return this.http.get<Cart>(API_URL);
  }

  /**
   * Add item to cart
   */
  addItemToCart(articleId: number, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${API_URL}/add/${articleId}?quantity=${quantity}`, {});
  }

  /**
   * Remove item from cart
   */
  removeItemFromCart(itemId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${API_URL}/item/${itemId}`);
  }

  /**
   * Update item quantity
   */
  updateItemQuantity(itemId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${API_URL}/item/${itemId}?quantity=${quantity}`, {});
  }

  
  /**
   * Remove item from cart by article ID
   */
  removeItemFromCartByArticleId(articleId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${API_URL}/remove/article/${articleId}`);
  }

  /**
   * Clear cart
   */
  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${API_URL}/clear`);
  }
}