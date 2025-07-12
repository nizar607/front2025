import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { category } from 'src/app/core/data/learning';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { addfavoriteByArticleData, deletefavoriteByArticleData, fetcharticleData, searcharticleData, addToCartData, removeFromCartData, removeItemFromCartByArticleId } from 'src/app/store/Article/article.action';
import { selectcategoryData } from 'src/app/store/Category/category-selector';
import { fetchcategoryData } from 'src/app/store/Category/category.action';


export interface checkBox {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: checkBox[];
}


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticlesComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$ = new Subject<void>();

  checkBox: checkBox = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  imageUrl = 'localhost:8080/files/'
  minSlider = 0;
  maxSlider = 5000;
  allComplete: boolean = false;
  articleList: any[] = [];
  articles: any[] = [];
  searchInput: string = '';

  categories: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  favorites: any[] = [];

  constructor(
    private store: Store, 
    private router: Router, 
    private favoriteService: FavoriteService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.fetchArticleList();
    this.fetchCategoryList();
  }


  viewArticleDetials(id: number) {
    this.router.navigate(['/client/product', id]);
  }

  fetchArticleList() {
    this.store.dispatch(fetcharticleData());
    this.store.select(selectarticleData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.articleList = data;
        this.articles = this.articleList.slice(0, this.itemsPerPage);
        this.cdr.markForCheck(); // Trigger change detection for OnPush strategy
      });
  }

  fetchCategoryList() {
    this.store.dispatch(fetchcategoryData());
    this.store.select(selectcategoryData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categories = data;
        this.checkBox.subtasks = this.categories.map(category => {
          return {
            id: category.id,
            name: category.name,
            completed: true,
            color: 'warn',
          };
        });
      });
  }

  ngAfterViewInit() {

    this.setAll(true);

  }

  updateAllComplete() {
    this.allComplete = this.checkBox.subtasks != null && this.checkBox.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.checkBox.subtasks == null) {
      return false;
    }
    return this.checkBox.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.checkBox.subtasks == null) {
      return;
    }
    this.checkBox.subtasks.forEach(t => (t.completed = completed));
  }

  searchArticles() {
    const searchInput = this.searchInput.trim().toLocaleLowerCase();
    const minPrice = this.minSlider;
    const maxPrice = this.maxSlider;
    const _categories: any[] = this.checkBox!.subtasks!.filter(category => category.completed);
    const categories: number[] = _categories.map(category => category.id);


    this.store.dispatch(searcharticleData({ searchInput, minPrice, maxPrice, categories }));
    this.store.select(selectarticleData).subscribe((data) => {
      this.articles = data;
      console.log("search data ", data);
    })

  }


  sortProducts(event: any) {
    const sortValue = event.target.value;
    let sortedArticles = [...this.articles];

    switch (sortValue) {
      case 'price-low':
        sortedArticles.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedArticles.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedArticles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    this.articles = sortedArticles;
  }

  addToCart(article: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (article.inCart) {
      this.store.dispatch(removeItemFromCartByArticleId({ articleId: article.id }));
      console.log('Removing from cart:', article);
    } else {
      this.store.dispatch(addToCartData({ articleId: article.id, quantity: 1 }));
      console.log('Adding to cart:', article);
    }
  }

  addToWishlist(article: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    article.favorite ? this.store.dispatch(deletefavoriteByArticleData({ id: article.id })) : this.store.dispatch(addfavoriteByArticleData({ newData: { articleId: article.id } }));
  }

  isNewArticle(createdAt: string): boolean {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return new Date(createdAt) > oneWeekAgo;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
