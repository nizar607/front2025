import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchfavoriteDataByUser, deletefavoriteData } from 'src/app/store/Favorite/favorite.action';
import { selectfavoriteData, selectDataLoading } from 'src/app/store/Favorite/favorite-selector';
import { FavoriteModel } from 'src/app/store/Favorite/favorite.model';
import { fetchcategoryData } from 'src/app/store/Category/category.action';
import { selectcategoryData } from 'src/app/store/Category/category-selector';
import { addItemToCart } from 'src/app/store/Cart/cart.action';

interface FavoriteItem {
  id: number;
  name: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  reviews: number;
  badge?: string;
  addedDate: Date;
  dateAdded: Date;
  selected?: boolean;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteItems: FavoriteItem[] = [];
  filteredItems: FavoriteItem[] = [];
  filteredFavorites: FavoriteItem[] = [];
  selectedItems: FavoriteItem[] = [];

  // View and filter states
  currentView: 'grid' | 'list' = 'grid';
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: string = 'newest';
  filterCategory: string = 'all';
  selectedCategory: string = 'all';

  // Navigation properties
  cartItemCount: number = 0;

  // Statistics
  totalFavorites: number = 0;
  totalValue: number = 0;
  categoriesCount: number = 0;

  // Available filter options
  sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  categories: any = [];

  loading: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.loadFavoriteItems();
    this.fetchCategoryList();
    // TODO: Replace with actual user ID from auth service or ap
    // Subscribe to loading state
    this.store.select(selectDataLoading).subscribe(loading => {
      this.loading = loading;
    });

    // Subscribe to favorite data from store
    this.store.select(selectfavoriteData).subscribe(data => {
      if (data && data.length > 0) {
        this.favoriteItems = this.mapToFavoriteItems(data);
        this.filteredItems = [...this.favoriteItems];
        this.filteredFavorites = [...this.favoriteItems];
        this.applyFilters();
        this.updateStatistics();
      }
    });
  }


  loadFavoriteItems() {
    this.store.dispatch(fetchfavoriteDataByUser());
  }

  fetchCategoryList() {
    this.store.dispatch(fetchcategoryData());
    this.store.select(selectcategoryData).subscribe((data) => {
      this.categories = data.map((cat) => { return { value: cat.name, label: cat.name } });
    });
  }

  /**
   * Maps the FavoriteModel from the store to the component's FavoriteItem interface
   */
  mapToFavoriteItems(favoriteModels: FavoriteModel[]): FavoriteItem[] {
    return favoriteModels.map(model => ({
      id: model.id,
      name: model.name,
      title: model.name, // Using name as title since FavoriteModel doesn't have title
      category: model.categoryName,
      price: model.price,
      image: model.imageUrl,
      rating: model.averageRating,
      reviewCount: model.reviewCount,
      reviews: model.reviewCount, // Using reviewCount for reviews since they're the same
      addedDate: model.addedToFavoritesAt ? new Date(model.addedToFavoritesAt) : new Date(),
      dateAdded: model.addedToFavoritesAt ? new Date(model.addedToFavoritesAt) : new Date(),
      selected: false
    }));
  }

  updateStatistics() {
    this.totalFavorites = this.favoriteItems.length;
    this.totalValue = this.favoriteItems.reduce((sum, item) => sum + item.price, 0);
    this.categoriesCount = new Set(this.favoriteItems.map(item => item.category)).size;
  }

  // View toggle methods
  setView(view: 'grid' | 'list') {
    this.currentView = view;
  }

  // Filter and sort methods
  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  onCategoryChange(category: string) {
    this.filterCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.favoriteItems];

    // Apply category filter
    if (this.filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === this.filterCategory);
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    this.filteredItems = filtered;
    this.filteredFavorites = filtered;
  }

  // Item actions
  removeFromFavorites(itemId: number) {
    // Dispatch delete action to the store
    this.store.dispatch(deletefavoriteData({ id: itemId.toString() }));
    // Local UI update for immediate feedback
    this.favoriteItems = this.favoriteItems.filter(item => item.id !== itemId);
    this.applyFilters();
    this.updateStatistics();
  }

  addToCart(item: FavoriteItem) {


    this.store.dispatch(addItemToCart({ articleId: item.id, quantity: 1 }));
    console.log('Adding to cart:', item.title);
  }

  viewProduct(item: FavoriteItem) {
    // TODO: Navigate to product details
    console.log('Viewing product:', item.title);
  }

  // Selection methods for bulk actions
  toggleItemSelection(item: FavoriteItem) {
    item.selected = !item.selected;
    this.updateSelectedItems();
  }

  updateSelectedItems() {
    this.selectedItems = this.filteredItems.filter(item => item.selected);
  }

  selectAllItems() {
    this.filteredItems.forEach(item => item.selected = true);
    this.updateSelectedItems();
  }

  deselectAllItems() {
    this.filteredItems.forEach(item => item.selected = false);
    this.updateSelectedItems();
  }

  // Bulk actions
  removeSelectedItems() {
    const selectedIds = this.selectedItems.map(item => item.id.toString());
    // Dispatch delete action to the store
    // this.store.dispatch(deletefavoriteData({ id: selectedIds }));
    // // Local UI update for immediate feedback
    // this.favoriteItems = this.favoriteItems.filter(item => !selectedIds.includes(item.id.toString()));
    // this.applyFilters();
    // this.updateStatistics();
    // this.selectedItems = [];
  }

  addSelectedToCart() {
    this.selectedItems.forEach(item => this.addToCart(item));
    this.deselectAllItems();
  }

  // Utility methods
  getStarsArray(count: number): number[] {
    return Array(Math.max(0, count || 0)).fill(0).map((x, i) => i + 1);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  // Navigation methods
  goHome() {
    // TODO: Navigate to home
    console.log('Navigate to home');
  }

  toggleCart() {
    // TODO: Toggle cart
    console.log('Toggle cart');
  }

  // View methods
  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.currentView = mode;
  }

  // Filter methods
  sortFavorites() {
    this.applyFilters();
  }

  filterByCategory() {
    this.filterCategory = this.selectedCategory;
    this.applyFilters();
  }

  // Statistics methods
  getTotalValue(): number {
    return this.favoriteItems.reduce((sum, item) => sum + item.price, 0);
  }

  getAverageRating(): number {
    if (this.favoriteItems.length === 0) return 0;
    const totalRating = this.favoriteItems.reduce((sum, item) => sum + item.rating, 0);
    return totalRating / this.favoriteItems.length;
  }

  // Star rating methods - removed getEmptyStarsArray as it's no longer needed

  removeSelectedFromFavorites() {
    this.removeSelectedItems();
  }

  get hasSelectedItems(): boolean {
    return this.selectedItems.length > 0;
  }

  get isEmpty(): boolean {
    return this.favoriteItems.length === 0;
  }


}
