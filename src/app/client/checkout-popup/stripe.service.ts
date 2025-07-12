import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private initializationPromise: Promise<Stripe | null> | null = null;

  constructor() {}

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
}