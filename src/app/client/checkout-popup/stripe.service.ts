import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private initializationPromise: Promise<Stripe | null> | null = null;


  constructor() {
  }

  async getStripe(): Promise<Stripe | null> {
    if (this.stripe) {
      return this.stripe;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initializeStripe();
    return this.initializationPromise;
  }

  private async initializeStripe(): Promise<Stripe | null> {
    try {
      // Add retry logic for blocked client scenarios
      const maxRetries = 3;
      let lastError: any;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Attempting to load Stripe (attempt ${attempt}/${maxRetries})`);

          this.stripe = await loadStripe(environment.stripe.publishableKey, {
            // Add additional options to help with blocked client issues
            stripeAccount: undefined,
            locale: 'en'
          });

          if (this.stripe) {
            console.log('Stripe loaded successfully');
            return this.stripe;
          } else {
            throw new Error('Stripe failed to load - returned null');
          }
        } catch (error: any) {
          lastError = error;
          console.warn(`Stripe load attempt ${attempt} failed:`, {
            error: error,
            message: error?.message,
            stack: error?.stack,
            name: error?.name,
            type: typeof error,
            stringified: error?.toString()
          });

          // If it's a blocked client error, wait before retrying
          if (attempt < maxRetries) {
            const delay = attempt * 1000; // Exponential backoff
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      // All attempts failed
      throw lastError || new Error('Failed to load Stripe after multiple attempts');
    } catch (error: any) {
      console.error('Stripe initialization failed:', {
        error: error,
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
        type: typeof error,
        stringified: error?.toString(),
        publishableKey: environment.stripe.publishableKey ? 'Present' : 'Missing'
      });
      this.initializationPromise = null; // Reset so we can try again later
      throw this.createUserFriendlyError(error);
    }
  }

  private createUserFriendlyError(error: any): Error {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';

    console.log('Creating user-friendly error from:', {
      originalError: error,
      errorMessage: errorMessage,
      errorType: typeof error
    });

    if (errorMessage.includes('blocked') || errorMessage.includes('ERR_BLOCKED_BY_CLIENT')) {
      const friendlyError = new Error('Payment system blocked by browser. Please disable ad blockers or try incognito mode.');
      (friendlyError as any).type = 'blocked_client';
      (friendlyError as any).originalError = error;
      return friendlyError;
    }

    if (errorMessage.includes('network') || errorMessage.includes('NetworkError')) {
      const friendlyError = new Error('Network error. Please check your internet connection and try again.');
      (friendlyError as any).type = 'network_error';
      (friendlyError as any).originalError = error;
      return friendlyError;
    }

    if (errorMessage.includes('timeout')) {
      const friendlyError = new Error('Request timed out. Please try again.');
      (friendlyError as any).type = 'timeout';
      (friendlyError as any).originalError = error;
      return friendlyError;
    }

    if (!environment.stripe.publishableKey) {
      const friendlyError = new Error('Stripe configuration missing. Please contact support.');
      (friendlyError as any).type = 'config_error';
      (friendlyError as any).originalError = error;
      return friendlyError;
    }

    // For debugging: include more information in development
    const debugInfo = !environment.production ? ` (Debug: ${errorMessage})` : '';
    const friendlyError = new Error(`Failed to initialize payment system. Please refresh the page and try again.${debugInfo}`);
    (friendlyError as any).type = 'initialization_error';
    (friendlyError as any).originalError = error;
    return friendlyError;
  }

  // Method to check if Stripe is available
  isStripeAvailable(): boolean {
    return this.stripe !== null;
  }

  // Method to reset Stripe instance (useful for retry scenarios)
  resetStripe(): void {
    this.stripe = null;
    this.initializationPromise = null;
  }

  // --- Helpers ---
  private getApiBase(): string {
    // Prefer environment.apiUrl if present, otherwise use relative path
    const anyEnv: any = environment as any;
    const base = (anyEnv && (anyEnv.apiUrl || anyEnv.apiBaseUrl)) ? (anyEnv.apiUrl || anyEnv.apiBaseUrl) : '';
    return base?.toString().replace(/\/$/, '') || '';
  }

  private buildAuthHeaders(contentTypeJson: boolean = true): Record<string, string> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if (contentTypeJson) {
      headers['Content-Type'] = 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Backend integration to create Checkout Session ---
  async createCheckoutSession(payload: any, website: string): Promise<{ status?: string; message?: string; sessionId?: string; sessionUrl?: string;[k: string]: any; }> {
    const base = this.getApiBase();
    const endpoint = `http://localhost:8080/api/product/v1/checkout?website=${website}`;
    // const url = `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}${this.uriParam ? `?uriParam=${encodeURIComponent(this.uriParam)}` : ''}`;
    const headers = this.buildAuthHeaders();
    console.log("url here ", endpoint);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create checkout session (${res.status}): ${text}`);
    }

    const data = await res.json();
    return data;
  }

  // --- Cart clearing API ---
  async clearCart(): Promise<boolean> {
    try {
      const base = this.getApiBase();
      const endpoint = '/api/cart/clear';
      const url = `${base}${endpoint}`;
      const headers = this.buildAuthHeaders(false);

      const res = await fetch(url, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.warn(`clearCart failed (${res.status}): ${text}`);
        return false;
      }

      return true;
    } catch (err) {
      console.warn('clearCart threw an error:', err);
      return false;
    }
  }

  // --- New: Redirect to Stripe Checkout ---
  async redirectToCheckout(sessionId?: string, sessionUrl?: string): Promise<void> {
    // If we have a direct URL, prefer using it without requiring Stripe to load
    if (sessionUrl && !sessionId) {
      window.location.assign(this.cleanUrl(sessionUrl));
      return;
    }

    try {
      if (sessionId) {
        if (!this.stripe) {
          try {
            await this.getStripe();
          } catch (initErr) {
            console.warn('Stripe failed to initialize for redirectToCheckout, will fallback to sessionUrl if available.', initErr);
            if (sessionUrl) {
              window.location.assign(this.cleanUrl(sessionUrl));
              return;
            }
            throw initErr;
          }
        }

        if (this.stripe) {
          const { error } = await this.stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.warn('redirectToCheckout error, falling back to sessionUrl if available:', error);
            if (sessionUrl) {
              window.location.assign(this.cleanUrl(sessionUrl));
              return;
            }
            throw error;
          }
          return;
        }
      }

      if (sessionUrl) {
        window.location.assign(this.cleanUrl(sessionUrl));
        return;
      }

      throw new Error('No sessionId or sessionUrl provided for checkout redirect');
    } catch (err) {
      console.error('Failed to redirect to Stripe Checkout:', err);
      throw err;
    }
  }

  // --- Success handling helper ---
  // Call this from your app bootstrap or success page component to clear the cart
  async clearCartOnSuccessIfNeeded(customSuccessPath?: string): Promise<boolean> {
    try {
      const successPath = customSuccessPath || (environment as any)?.stripe?.successPath || '/success';
      const loc = window?.location;
      if (!loc) return false;
      const pathname = (loc.pathname || '').toLowerCase();
      const isSuccess = pathname.endsWith(successPath.toLowerCase());

      if (!isSuccess) {
        return false;
      }

      const cleared = await this.clearCart();
      if (!cleared) {
        console.warn('Cart clear on success returned false');
      }
      return cleared;
    } catch (e) {
      console.warn('clearCartOnSuccessIfNeeded error:', e);
      return false;
    }
  }

  private cleanUrl(url: string): string {
    if (!url) return url;
    return url.replace(/`/g, '').replace(/^\s+|\s+$/g, '').replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  }
}