import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchfavoriteDataByUser } from 'src/app/store/Favorite/favorite.action';
import { selectFavoriteCount } from 'src/app/store/Favorite/favorite-selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  favoriteItemCount: number = 0;
  constructor(private sharedService: SharedService, private router: Router, private store: Store) { }

  ngOnInit() {
    this.loadFavoriteItems();
  }


  loadFavoriteItems() {
    this.store.dispatch(fetchfavoriteDataByUser());
    this.store.select(selectFavoriteCount).subscribe((count) => {
      this.favoriteItemCount = count;
      console.log("favorite items count", this.favoriteItemCount);
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
