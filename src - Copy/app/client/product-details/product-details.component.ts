import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { fetcharticleData } from 'src/app/store/Article/article.action';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number = 0;
  product: any = {};
  relatedProducts: any[] = [];
  currentImageIndex: number = 0;
  quantity: number = 1;
  reviews: any[] = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      date: '2023-05-15',
      comment: 'Excellent product! Very comfortable and stylish. Would definitely recommend.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      date: '2023-05-10',
      comment: 'Good quality for the price. Delivery was fast and the product looks exactly like in the pictures.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 3,
      date: '2023-05-05',
      comment: 'Average product. It serves its purpose but nothing extraordinary.',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];
  newReview = {
    rating: 5,
    comment: ''
  };
  
  // Product images array (would normally come from the product data)
  productImages: string[] = [
    'https://fastly.picsum.photos/id/26/600/400.jpg?hmac=E1-2QJCQxWIvxpZjJFXzCBQnUMFtmh6jti8VJTiiMcU',
    'https://fastly.picsum.photos/id/96/600/400.jpg?hmac=GFz3ZhXTbOAXZ0QlzTT2LpTYdHAIhqbCZYNsYLTcHZk',
    'https://fastly.picsum.photos/id/83/600/400.jpg?hmac=SkwgkPSK6zQDT5JueJ9XIZmr8zk9G1w7UX_O-RS8Z_g',
    'https://fastly.picsum.photos/id/49/600/400.jpg?hmac=5PwUbpRYvFlgMuHQv6_QRYvvJR9qDQIUdpkSn9JBHRo'
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Convert to number
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    // Fetch all articles
    this.store.dispatch(fetcharticleData());
    this.store.select(selectarticleData).subscribe((data) => {
      if (data && data.length > 0) {
        // Find the product with the matching ID
        this.product = data.find(item => item.id === this.productId) || {};
        
        // Get related products (same category or random selection)
        this.relatedProducts = data
          .filter(item => item.id !== this.productId)
          .slice(0, 4); // Limit to 4 related products
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

  setImage(index: number): void {
    this.currentImageIndex = index;
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
    // Here you would implement the logic to add the product to the cart
    console.log('Adding to cart:', this.product, 'Quantity:', this.quantity);
    // Show a success message or navigate to cart
  }

  // Review submission
  submitReview(): void {
    if (this.newReview.comment.trim() !== '') {
      const review = {
        id: this.reviews.length + 1,
        user: 'Current User', // In a real app, this would be the logged-in user
        rating: this.newReview.rating,
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        comment: this.newReview.comment,
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg' // Default avatar
      };
      
      this.reviews.unshift(review); // Add to the beginning of the array
      this.newReview = { rating: 5, comment: '' }; // Reset the form
    }
  }

  // Helper method to generate an array for star ratings
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i + 1);
  }
}