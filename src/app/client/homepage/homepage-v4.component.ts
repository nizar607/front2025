import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-homepage-v4',
  templateUrl: './homepage-v4.component.html',
  styleUrl: './homepage-v4.component.css'
})
export class HomepageV4Component implements OnInit, AfterViewInit, OnDestroy {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;

  content = {
    hero: {
      badge: 'New Collection',
      title: 'Transform Your Space with Nova',
      subtitle: 'Discover our curated collection',
      buttonText: 'Shop Collection',
      primaryButton: 'Shop Collection',
      secondaryButton: 'View in 3D',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    features: {
      title: 'Why Choose Nova',
      subtitle: 'We combine innovative design with exceptional craftsmanship to create furniture that stands the test of time',
      items: [
        {
          title: 'Innovative Design',
          description: 'Our award-winning design team creates unique pieces that seamlessly blend contemporary aesthetics with functional excellence, ensuring each item transforms your space.',
          link: 'Explore Designs'
        },
        {
          title: 'Premium Quality',
          description: 'Crafted with the finest materials and time-tested construction techniques, our furniture is built to last generations while maintaining its beauty and functionality.',
          link: 'Quality Promise'
        },
        {
          title: 'Sustainable Future',
          description: 'We\'re committed to environmental responsibility through sustainable sourcing, eco-friendly manufacturing, and carbon-neutral shipping for a better tomorrow.',
          link: 'Our Mission'
        }
      ]
    },
    products: {
      title: 'Featured Products',
      items: [
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'Best Seller',
          category: 'Living Room',
          name: 'Luxe Sectional Sofa',
          price: '$2,499',
          buttonText: 'Add to Cart'
        },
        {
          image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'New',
          category: 'Bedroom',
          name: 'Minimalist Platform Bed',
          price: '$1,899',
          buttonText: 'Add to Cart'
        },
        {
          image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'Limited',
          category: 'Dining',
          name: 'Oak Dining Table',
          price: '$1,599',
          buttonText: 'Add to Cart'
        },
        {
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'Popular',
          category: 'Living Room',
          name: 'Glass Coffee Table',
          price: '$899',
          buttonText: 'Add to Cart'
        },
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'New',
          category: 'Bedroom',
          name: 'Modern Nightstand',
          price: '$449',
          buttonText: 'Add to Cart'
        },
        {
          image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          badge: 'Sale',
          category: 'Dining',
          name: 'Designer Dining Chairs',
          price: '$299',
          buttonText: 'Add to Cart'
        }
      ]
    },
    newsletter: {
      title: 'Stay Updated',
      text: 'Get the latest updates on new collections, exclusive offers, and design inspiration delivered to your inbox.'
    }
  };

  private observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  private observer!: IntersectionObserver;
  private productNavButtons: NodeListOf<Element> | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    
    // Subscribe to user data
    this.store.select(getUser).subscribe(user => {
      this.connectedUser = user;
      this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
    });

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

  // Content editing methods removed - using the more comprehensive versions below

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

  // Content editing methods
  toggleEditMode() {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
      if (!this.editingMode) {
        this.editingSection = null;
        this.editingField = null;
      }
    }
  }

  saveChanges() {
    if (this.isAdmin && this.editingMode) {
      // Here you would typically save to a backend service
      console.log('Saving homepage content changes:', this.content);
      this.editingMode = false;
      this.editingSection = null;
      this.editingField = null;
      alert('Changes saved successfully!');
    }
  }

  startEditing(section: string, field: string) {
    if (this.editingMode && this.isAdmin) {
      this.editingSection = section;
      this.editingField = field;
    }
  }

  updateContent(section: string, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      const keys = section.split('.');
      let obj: any = this.content;
      
      // Navigate to the correct nested object
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      
      // Update the field
      obj[keys[keys.length - 1]][field] = value;
    }
  }

  updateProductContent(productIndex: number, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content.products.items[productIndex] as any)[field] = value;
    }
  }

  updateFeatureContent(featureIndex: number, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content.features.items[featureIndex] as any)[field] = value;
    }
  }

  // File input methods
  triggerFileInput(section: string, index?: number) {
    if (!this.editingMode || !this.isAdmin) return;
    
    const fileInputId = index !== undefined ? `${section}Img${index}` : `${section}Img`;
    const fileInput = document.getElementById(fileInputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageUpload(event: any, section: string, index?: number) {
    if (this.isAdmin && this.editingMode) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log('Image upload:', section, index, e.target.result?.substring(0, 50));
          if (section === 'products' && index !== undefined) {
            this.content.products.items[index].image = e.target.result;
            console.log('Updated product image:', index, this.content.products.items[index].image?.substring(0, 50));
            // Force change detection
            setTimeout(() => {
              const imgElement = document.querySelector(`img[src*="${this.content.products.items[index].image?.substring(20, 50)}"]`) as HTMLImageElement;
              if (imgElement) {
                imgElement.src = this.content.products.items[index].image;
              }
            }, 100);
          } else if (section === 'hero') {
            // Update hero background image dynamically
            this.content.hero.backgroundImage = e.target.result;
            const heroElement = document.querySelector('.hero') as HTMLElement;
            if (heroElement) {
              heroElement.style.setProperty('--hero-bg-image', `url('${e.target.result}')`);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}