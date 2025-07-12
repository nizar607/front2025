import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


import { selectSingleArticleData, selectarticleData } from 'src/app/store/Article/article-selector';
import { fetchSingleArticleData, addToCartData, removeItemFromCartByArticleId } from 'src/app/store/Article/article.action';
import { addreviewData, fetchreviewByArticleData } from 'src/app/store/Review/review.action';


import { selectreviewData } from 'src/app/store/Review/review-selector';
import { environment } from 'src/environments/environment';
import { ArticleService } from "src/app/core/services/article/article.service";
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  productId: number = 0;
  product: any = {};
  relatedProducts: any[] = [];
  currentImageIndex: number = 0;
  quantity: number = 1;

  userRating: number = 0;
  hoveredRating: number = 0;
  userReviewText: string = '';

  // id: 1,
  // user: 'John Doe',
  // rating: 5,
  // date: '2023-05-15',
  // comment: 'Excellent product! Very comfortable and stylish. Would definitely recommend.',
  // avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  reviews: any[] = [];
  displayedReviewsCount: number = 3;
  newReview = {
    rating: 5,
    comment: ''
  };

  // Product options
  selectedColor: string = 'black';
  selectedSize: string = 'M';

  // Available options
  availableColors = [
    { name: 'black', label: 'Black' },
    { name: 'brown', label: 'Brown' },
    { name: 'gray', label: 'Gray' }
  ];

  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Product images array (would normally come from the product data)
  productImages: string[] = [
    // 'https://fastly.picsum.photos/id/26/600/400.jpg?hmac=E1-2QJCQxWIvxpZjJFXzCBQnUMFtmh6jti8VJTiiMcU',
    // 'https://fastly.picsum.photos/id/96/600/400.jpg?hmac=GFz3ZhXTbOAXZ0QlzTT2LpTYdHAIhqbCZYNsYLTcHZk',
    // 'https://fastly.picsum.photos/id/83/600/400.jpg?hmac=SkwgkPSK6zQDT5JueJ9XIZmr8zk9G1w7UX_O-RS8Z_g',
    // 'https://fastly.picsum.photos/id/49/600/400.jpg?hmac=5PwUbpRYvFlgMuHQv6_QRYvvJR9qDQIUdpkSn9JBHRo'
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private sharedService: SharedService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const id = +params['id']; // Convert to number
      console.log("product id ", id);
      if (id && !isNaN(id) && id !== 0) {
        this.productId = id;
        this.loadProductDetails(id);
        // this.articleService.fetchSingleArticleData(id).subscribe((data: any) => {
        //   this.product = data;
        //   console.log("single article data ", data);
        // })
        this.fetchReviewsList();
      } else {
        console.error('Invalid product ID:', params['id']);
      }
    });
  }

  fetchReviewsList() {
    if (this.productId && this.productId !== 0 && !isNaN(this.productId)) {
      this.store.dispatch(fetchreviewByArticleData({ id: this.productId }));
      this.store.select(selectreviewData).pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        this.reviews = data || [];
        console.log("reviews data ", data);
      });
    }
  }

  loadProductDetails(id: number): void {
    // Fetch single article
    this.store.dispatch(fetchSingleArticleData({ id: id }));
    this.store.select(selectSingleArticleData).pipe(
      takeUntil(this.destroy$),
      filter(data => data !== null && data !== undefined)
    ).subscribe((data) => {
      this.product = data;
      console.log("single article data ", data);
      // Set product images if available
      if (data.images && data.images.length > 0) {
        this.productImages = data.images;
      } else if (data.image) {
        this.productImages = [data.image];
      }
    });

    // Subscribe to article list for real-time updates
    this.store.select(selectarticleData).pipe(
      takeUntil(this.destroy$)
    ).subscribe((articles) => {
      if (articles && articles.length > 0) {
        const updatedProduct = articles.find(article => article.id === id);
        if (updatedProduct && this.product) {
          this.product = { ...this.product, inCart: updatedProduct.inCart };
        }
      }
    });
  }

  // Image gallery navigation
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
  }



  // Quantity controls
  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Add to cart functionality
  addToCart(): void {
    if (this.product.inCart) {
      this.store.dispatch(removeItemFromCartByArticleId({ articleId: this.product.id }));
      console.log('Removing from cart:', this.product);
    } else {
      this.store.dispatch(addToCartData({ articleId: this.product.id, quantity: this.quantity }));
      console.log('Adding to cart:', this.product, 'Quantity:', this.quantity);
    }
  }


  // Product option selection methods
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  // Wishlist functionality
  addToWishlist(): void {
    console.log('Adding to wishlist:', this.product);
    // Here you would implement the logic to add the product to the wishlist
    // Show a success message
  }

  // Review helpful functionality
  markHelpful(reviewId: number): void {
    console.log('Marking review as helpful:', reviewId);
    // Here you would implement the logic to mark a review as helpful
  }



  toggleWishlist(): void {
    // this.sharedService.toggleWishlist(product);
  }

  isInWishlist(product: any): void {
    // return this.sharedService.isInWishlist(product);
  }




  // Star rating methods
  setRating(rating: number): void {
    this.userRating = rating;
    console.log('User rated:', rating, 'stars');
  }

  setHoverRating(rating: number): void {
    this.hoveredRating = rating;
  }

  clearHoverRating(): void {
    this.hoveredRating = 0;
  }

  submitReview(): void {
    if (this.userRating > 0 && this.userReviewText.trim()) {
      const newReview = { // Replace with actual user name
        rating: this.userRating,
        comment: this.userReviewText,
        articleId: this.productId,
        helpful: 0
      };

      this.store.dispatch(addreviewData({ newData: newReview }));
      // Add to reviews array (you might want to send this to your backend)
      this.store.dispatch(fetchreviewByArticleData({ id: this.productId }));
      this.userRating = 0;
      this.userReviewText = '';

      console.log('Review submitted:', newReview);
    } else {
      alert('Please provide a rating and write a review before submitting.');
    }
  }

  // Helper method for getting stars array
  getStarsArray(count: number): number[] {
    return Array(Math.max(0, count || 0)).fill(0).map((x, i) => i + 1);
  }

  // Get product image URL with fallback
  getProductImageUrl(): string {
    if (this.product?.image) {
      return `${environment.production ? 'https://your-api-domain.com' : 'http://localhost:8080'}/api/files/${this.product.image}`;
    }
    return "";
  }

  // Handle image loading errors
  onImageError(event: any): void {
    console.warn('Image failed to load:', event.target.src);
    event.target.src = 'assets/images/category.png';
  }

  // Format price with proper validation
  formatPrice(price: number | string | undefined): string {
    if (price === null || price === undefined) {
      return '0.00';
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  }

  // Get total price with validation
  getTotalPrice(): number {
    const price = this.product?.price || 0;
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return (isNaN(numPrice) ? 0 : numPrice) * this.quantity;
  }

  // Get display reviews with safety checks
  getDisplayReviews(): any[] {
    if (!this.reviews || !Array.isArray(this.reviews)) {
      return [];
    }
    return this.reviews.slice(0, this.displayedReviewsCount);
  }

  // Load more reviews (3 at a time)
  loadMoreReviews(): void {
    this.displayedReviewsCount += 3;
  }

  // Check if there are more reviews to show
  hasMoreReviews(): boolean {
    return this.reviews && this.reviews.length > this.displayedReviewsCount;
  }

  // Format date with fallback
  formatDate(date: string | Date | undefined): string {
    if (!date) {
      return 'No date';
    }
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.warn('Invalid date format:', date);
      return 'Invalid date';
    }
  }

  // Enhanced setImage with bounds checking
  setImage(index: number): void {
    if (this.productImages && index >= 0 && index < this.productImages.length) {
      this.currentImageIndex = index;
    }
  }

  // Enhanced getInitials with null checks
  getInitials(name: string | undefined): string {
    if (!name || typeof name !== 'string') {
      return 'U'; // Default for 'User'
    }
    return name.split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2); // Limit to 2 characters
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}