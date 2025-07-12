import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchfavoriteDataByUser } from 'src/app/store/Favorite/favorite.action';
import { selectFavoriteCount } from 'src/app/store/Favorite/favorite-selector';
import * as CartActions from 'src/app/store/Cart/cart.action';
import { selectCartItemsCount } from 'src/app/store/Cart/cart.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  favoriteItemCount: number = 0;
  cartItemCount: number = 0;
  constructor(private sharedService: SharedService, private router: Router, private store: Store) { }

  ngOnInit() {
    this.loadFavoriteItems();
    this.loadCartItems();
  }


  loadFavoriteItems() {
    this.store.dispatch(fetchfavoriteDataByUser());
    this.store.select(selectFavoriteCount).subscribe((count) => {
      this.favoriteItemCount = count;
      console.log("favorite items count", this.favoriteItemCount);
    });
  }

  loadCartItems() {
    this.store.dispatch(CartActions.getCart());
    this.store.select(selectCartItemsCount).subscribe((count) => {
      this.cartItemCount = count;
      console.log("cart items count", this.cartItemCount);
    });
  }









  navigateToHome() {
    this.callParentMethod();
    this.router.navigate(['/client']);
  }



  callParentMethod() {
    this.sharedService.disableScroll(false);
  }

}
