import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-homepage-v4',
  templateUrl: './homepage-v4.component.html',
  styleUrl: './homepage-v4.component.css'
})
export class HomepageV4Component implements OnInit, AfterViewInit, OnDestroy {

  private observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  private observer!: IntersectionObserver;
  private productNavButtons: NodeListOf<Element> | undefined;

  ngOnInit() {
    // Initialize intersection observer for fade-in animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);
  }

  ngAfterViewInit() {
    // Setup smooth scrolling
    this.setupSmoothScrolling();
    
    // Setup navbar scroll effect
    this.setupNavbarScrollEffect();
    
    // Setup fade-in animations
    this.setupFadeInAnimations();
    
    // Setup product filtering
    this.setupProductFiltering();
    
    // Setup newsletter form
    this.setupNewsletterForm();
    
    // Setup add to cart functionality
    this.setupAddToCartFunctionality();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const anchorElement = e.target as HTMLAnchorElement;
        const target = document.querySelector(anchorElement.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  private setupNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  }

  private setupFadeInAnimations() {
    document.querySelectorAll('.fade-in').forEach(el => {
      this.observer.observe(el);
    });
  }

  private setupProductFiltering() {
    this.productNavButtons = document.querySelectorAll('.product-nav-btn');
    this.productNavButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        
        // Remove active class from all buttons
        this.productNavButtons?.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        target.classList.add('active');
        
        const category = target.getAttribute('data-category');
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
          const productElement = product as HTMLElement;
          if (category === 'all' || product.classList.contains(category || '')) {
            productElement.style.display = 'block';
            setTimeout(() => {
              productElement.style.opacity = '1';
              productElement.style.transform = 'translateY(0)';
            }, 100);
          } else {
            productElement.style.opacity = '0';
            productElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
              productElement.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  private setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('.newsletter-input') as HTMLInputElement;
        const email = emailInput.value;
        alert(`Thank you for subscribing with email: ${email}`);
        form.reset();
      });
    }
  }

  private setupAddToCartFunctionality() {
    document.querySelectorAll('.product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const buttonElement = e.target as HTMLElement;
        const productCard = buttonElement.closest('.product-card');
        const productName = productCard?.querySelector('.product-name')?.textContent;
        
        buttonElement.textContent = 'Added!';
        buttonElement.style.background = '#ff6b35';
        buttonElement.style.borderColor = '#ff6b35';
        
        setTimeout(() => {
          buttonElement.textContent = 'Add to Cart';
          buttonElement.style.background = 'transparent';
          buttonElement.style.borderColor = '#333';
        }, 2000);
      });
    });
  }

  // Navigation methods for Angular routing
  navigateToArticles() {
    // This would use Angular Router in a real implementation
    console.log('Navigate to articles');
  }

  navigateTo3D() {
    // This would use Angular Router in a real implementation
    console.log('Navigate to 3D room planner');
  }

  onFeatureLinkClick(feature: string) {
    console.log(`Explore ${feature}`);
  }

  onProductViewDetails(productName: string) {
    console.log(`View details for ${productName}`);
  }

  onCategoryClick(category: string) {
    console.log(`Navigate to ${category} category`);
  }
}