import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { Cart, CartItem } from 'src/app/store/Cart/cart.model';
import * as CartSelectors from 'src/app/store/Cart/cart.selector';
import { StripeService } from './stripe.service';
import { ActivatedRoute } from '@angular/router';

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

  uriParam: string | null = null;


  constructor(
    private store: Store,
    private stripeService: StripeService,
    private route: ActivatedRoute
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

    this.route.parent?.paramMap.subscribe(params => {
      this.uriParam = params.get('uriParam');
      console.log('Fetched uriParam in checkout popup:', this.uriParam);
    });
  }

  ngAfterViewInit() {
    // No Stripe Elements/card form needed for hosted Checkout
  }

  async ngOnChanges(changes: any) {
    // Skip initializing Stripe Elements; we only redirect to hosted Checkout
    if (changes.isVisible && changes.isVisible.currentValue && !this.stripeInitialized) {
      this.stripeInitialized = true;
    }
  }

  async processPayment() {
    // Directly proceed without local form validation, since Stripe Checkout collects details

    this.isProcessing = true;
    this.paymentError = null;

    try {
      // Snapshot cart data
      const [items, totalAmount] = await Promise.all([
        firstValueFrom(this.cartItems$),
        firstValueFrom(this.cartTotal$)
      ]);

      // Build minimal payload for backend session creation
      const payload: any = {
        items: (items || []).map((it: any) => ({
          id: it.id || it.articleId || it.sku || null,
          name: it?.name || it?.article?.name,
          quantity: it.quantity,
          price: it?.price, // unit price
          image: it?.image || it?.article?.image || null
        })),
        amount: totalAmount, // backend should recompute for security
        currency: 'usd',
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`
      };

      // Create checkout session in backend
      const sessionResp = await this.stripeService.createCheckoutSession(payload,this.uriParam || '');

      console.log('Checkout session response:', sessionResp);

      // Support multiple response shapes
      const sessionId = sessionResp?.sessionId || sessionResp['id'] || sessionResp['stripe']?.id;
      const sessionUrl = sessionResp?.sessionUrl || sessionResp['url'] || sessionResp['stripe']?.url;

      // Redirect to Stripe Checkout (prefer URL when available)
      await this.stripeService.redirectToCheckout(sessionId, sessionUrl);

      // Note: Redirect will navigate away. If it returns without navigation, show an error
      this.paymentError = 'Redirection to Stripe Checkout did not occur. Please click the button again or try a different browser.';
    } catch (error: any) {
      console.error('Payment processing error:', error);

      if (error.message && (error.message.includes('blocked') || error.message.includes('ERR_BLOCKED_BY_CLIENT'))) {
        this.paymentError = 'Payment blocked by browser security. Please disable ad blockers, whitelist Stripe domains, or try incognito mode.';
      } else if (error.name === 'NetworkError' || (error.message && error.message.toLowerCase().includes('network'))) {
        this.paymentError = 'Network error during payment. Please check your connection and try again.';
      } else if (error.type === 'card_error') {
        this.paymentError = error.message || 'Card error. Please check your card details.';
      } else {
        this.paymentError = error?.message || 'Payment processing failed. Please try again or contact support.';
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private isFormValid(): boolean {
    // Not used anymore; Stripe Checkout collects details on its page
    return true;
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
    // No initialization needed for hosted Checkout flow
  }
}