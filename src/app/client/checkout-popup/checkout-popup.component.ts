import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/store/Cart/cart.model';
import * as CartSelectors from 'src/app/store/Cart/cart.selector';
import { StripeService } from './stripe.service';

@Component({
  selector: 'app-checkout-popup',
  templateUrl: './checkout-popup.component.html',
  styleUrls: ['./checkout-popup.component.css']
})
export class CheckoutPopupComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Output() closePopup = new EventEmitter<void>();
  @Output() paymentSuccess = new EventEmitter<any>();

  private stripeInitialized = false;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  cartTotal$: Observable<number>;
  cartItems$: Observable<any[]>;

  isProcessing = false;
  paymentError: string | null = null;

  // Customer information
  customerInfo = {
    email: '',
    name: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: 'US'
    }
  };

  constructor(
    private store: Store,
    private stripeService: StripeService
  ) {
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartItems$.subscribe((items) => {
      console.log('Cart items:', items);
    })
  }

  ngOnInit() {
    console.log("his.cartItems ");
    this.cartItems$.forEach((item) => console.log(item));
  }

  ngAfterViewInit() {
    // Stripe will be initialized when popup becomes visible
  }

  async ngOnChanges(changes: any) {
    if (changes.isVisible && changes.isVisible.currentValue && !this.stripeInitialized) {
      console.log('Popup became visible, initializing Stripe...');
      // Small delay to ensure DOM is fully rendered
      setTimeout(async () => {
        await this.initializeStripe();
        this.stripeInitialized = true;
      }, 100);
    }
  }

  async initializeStripe() {
    try {
      this.stripe = await this.stripeService.getStripe();
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.setupCardElement();
      } else {
        throw new Error('Stripe failed to load');
      }
    } catch (error: any) {
      console.error('Error initializing Stripe:', error);
      this.paymentError = error.message || 'Failed to initialize payment system. Please refresh the page and try again.';
    }
  }

  setupCardElement() {
    console.log('Setting up card element...', {
      elements: this.elements,
      stripe: this.stripe
    });
    
    if (!this.elements) {
      console.error('Elements not available for card setup');
      return;
    }

    try {
      this.cardElement = this.elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
        },
      });

      console.log('Card element created:', this.cardElement);

      // Mount the card element with multiple retry attempts
      this.mountCardElementWithRetry();
    } catch (error) {
      console.error('Error creating card element:', error);
      this.paymentError = 'Failed to initialize payment form. Please refresh the page.';
    }
  }

  private mountCardElementWithRetry(attempt: number = 1, maxAttempts: number = 5) {
    const delay = attempt * 200; // Increasing delay: 200ms, 400ms, 600ms, etc.
    
    setTimeout(() => {
      const cardContainer = document.getElementById('card-element');
      console.log(`Mount attempt ${attempt}/${maxAttempts} - Card container found:`, cardContainer);
      console.log('Card element available:', this.cardElement);
      
      if (this.cardElement && cardContainer) {
        try {
          this.cardElement.mount('#card-element');
          console.log('Card element mounted successfully on attempt', attempt);
          
          // Add event listeners for better debugging
          this.cardElement.on('ready', () => {
            console.log('Card element is ready');
          });
          
          this.cardElement.on('change', (event) => {
            console.log('Card element changed:', event);
          });
          
          this.cardElement.on('focus', () => {
            console.log('Card element focused');
          });
          
          this.cardElement.on('blur', () => {
            console.log('Card element blurred');
          });
          
        } catch (mountError) {
          console.error(`Error mounting card element on attempt ${attempt}:`, mountError);
          if (attempt < maxAttempts) {
            console.log(`Retrying mount in ${delay * 2}ms...`);
            this.mountCardElementWithRetry(attempt + 1, maxAttempts);
          } else {
            this.paymentError = 'Failed to load payment form. Please refresh the page.';
          }
        }
      } else {
        if (attempt < maxAttempts) {
          console.log(`Card element or container not ready on attempt ${attempt}, retrying in ${delay * 2}ms...`);
          this.mountCardElementWithRetry(attempt + 1, maxAttempts);
        } else {
          console.error('Card element or container not available after all attempts');
          this.paymentError = 'Payment form not available. Please refresh the page.';
        }
      }
    }, delay);
  }

  async processPayment() {
    if (!this.stripe || !this.cardElement) {
      this.paymentError = 'Payment system not initialized';
      return;
    }

    if (!this.isFormValid()) {
      this.paymentError = 'Please fill in all required fields';
      return;
    }

    this.isProcessing = true;
    this.paymentError = null;

    try {
      // Get the current cart total
      let totalAmount = 0;
      this.cartTotal$.subscribe(total => totalAmount = total).unsubscribe();

      // Create payment method
      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
        billing_details: {
          name: this.customerInfo.name,
          email: this.customerInfo.email,
          address: this.customerInfo.address,
        },
      });

      if (error) {
        this.paymentError = error.message || 'Payment failed';
        this.isProcessing = false;
        return;
      }

      // In a real application, you would send the payment method to your backend
      // For demo purposes, we'll simulate a successful payment
      await this.simulatePaymentProcessing();

      // Emit success event
      this.paymentSuccess.emit({
        paymentMethod,
        amount: totalAmount,
        customerInfo: this.customerInfo
      });

      this.closePopup.emit();
    } catch (error: any) {
      console.error('Payment processing error:', error);

      // Handle specific error types during payment processing
      if (error.message && (error.message.includes('blocked') || error.message.includes('ERR_BLOCKED_BY_CLIENT'))) {
        this.paymentError = 'Payment blocked by browser security. Please disable ad blockers, whitelist Stripe domains, or try incognito mode.';
      } else if (error.name === 'NetworkError' || error.message.includes('network')) {
        this.paymentError = 'Network error during payment. Please check your connection and try again.';
      } else if (error.type === 'card_error') {
        this.paymentError = error.message || 'Card error. Please check your card details.';
      } else {
        this.paymentError = 'Payment processing failed. Please try again or contact support.';
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private async simulatePaymentProcessing(): Promise<void> {
    // Simulate API call delay
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  private isFormValid(): boolean {
    return !!(this.customerInfo.email &&
      this.customerInfo.name &&
      this.customerInfo.address.line1 &&
      this.customerInfo.address.city &&
      this.customerInfo.address.postal_code);
  }

  onClose() {
    this.closePopup.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  async retryStripeInitialization() {
    this.paymentError = null;
    this.stripeService.resetStripe();
    await this.initializeStripe();
  }
}