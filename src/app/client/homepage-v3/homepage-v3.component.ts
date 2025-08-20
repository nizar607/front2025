import { Component, OnInit, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { fetchHomepage3Data, updateHomepage3Data, updateHomepage3Images } from '../../store/Homepage3/homepage3.action';
import { selectHomepage3Data, selectHomepage3Loading, selectHomepage3Error } from '../../store/Homepage3/homepage3-selector';
import { Homepage3DTO } from '../../store/Homepage3/homepage3.model';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-homepage-v3',
  templateUrl: './homepage-v3.component.html',
  styleUrl: './homepage-v3.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomepageV3Component implements OnInit, AfterViewInit, OnDestroy {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;
  content$: Observable<any | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  // Image files for upload
  heroImageFile: File | null = null;
  heroBackgroundImageFile: File | null = null;
  featuredProduct1ImageFile: File | null = null;
  featuredProduct2ImageFile: File | null = null;
  featuredProduct3ImageFile: File | null = null;
  categoryItem1ImageFile: File | null = null;
  categoryItem2ImageFile: File | null = null;
  categoryItem3ImageFile: File | null = null;
  artisanImageFile: File | null = null;
  diningInfoImageFile: File | null = null;

  defaultContent: Homepage3DTO = {
    // Hero Section
    heroTitle: 'Loading...',
    heroSubtitle: 'Loading...',
    heroPrimaryCta: 'Loading...',
    heroSecondaryCta: 'Loading...',
    heroBackgroundImage: '',
    heroBadge: 'Loading...',
    heroButtonText: 'Loading...',
    heroPrimaryButton: 'Loading...',
    heroSecondaryButton: 'Loading...',
    heroImage: '',

    // Featured Section
    featuredTitle: 'Loading...',
    featuredSubtitle: 'Loading...',

    // Featured Products
    featuredProduct1Image: '',
    featuredProduct1Category: 'Loading...',
    featuredProduct1Name: 'Loading...',
    featuredProduct1Description: 'Loading...',
    featuredProduct1Price: 'Loading...',

    featuredProduct2Image: '',
    featuredProduct2Category: 'Loading...',
    featuredProduct2Name: 'Loading...',
    featuredProduct2Description: 'Loading...',
    featuredProduct2Price: 'Loading...',

    featuredProduct3Image: '',
    featuredProduct3Category: 'Loading...',
    featuredProduct3Name: 'Loading...',
    featuredProduct3Description: 'Loading...',
    featuredProduct3Price: 'Loading...',

    // Categories Section
    categoriesTitle: 'Loading...',
    categoriesSubtitle: 'Loading...',

    // Category Items
    categoryItem1Image: '',
    categoryItem1Name: 'Loading...',
    categoryItem1Count: 'Loading...',

    categoryItem2Image: '',
    categoryItem2Name: 'Loading...',
    categoryItem2Count: 'Loading...',

    categoryItem3Image: '',
    categoryItem3Name: 'Loading...',
    categoryItem3Count: 'Loading...',

    // Artisan Section
    artisanTitle: 'Loading...',
    artisanDescription: 'Loading...',
    artisanLink: 'Loading...',
    artisanImage: '',

    // Newsletter Section
    newsletterTitle: 'Loading...',
    newsletterText: 'Loading...',

    // Dining Info Section
    diningInfoTitle: 'Loading...',
    diningInfoDescription: 'Loading...',
    diningInfoButton: 'Loading...',
    diningInfoImage: ''
  };

  // Content will be loaded from store
  content: any = null;

  private observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  private observer!: IntersectionObserver;
  private productNavButtons: NodeListOf<Element> | undefined;

  constructor(private store: Store) {
    this.content$ = this.store.select(selectHomepage3Data);
    this.loading$ = this.store.select(selectHomepage3Loading);
    this.error$ = this.store.select(selectHomepage3Error);
  }

  ngOnInit() {
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    this.store.dispatch(fetchHomepage3Data());
    
    // Subscribe to user data
    this.subscription.add(
      this.store.select(getUser).subscribe(user => {
        this.connectedUser = user;
        this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
      })
    );
    
    // Subscribe to content changes from store
    this.subscription.add(
      this.content$.subscribe(data => {
        this.content = data || this.defaultContent;
      })
    );

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
    this.subscription.unsubscribe();
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
      this.content$.subscribe(currentData => {
        if (currentData?.id) {
          // Create updated data object
          const updatedData = {
            ...currentData,
            // Update with any modified content from the form
          };
          
          // Dispatch update action
          this.store.dispatch(updateHomepage3Data({ 
            id: currentData.id, 
            updatedData 
          }));
          
          // Handle image uploads if any
          const hasImages = this.heroImageFile || this.heroBackgroundImageFile || 
                           this.featuredProduct1ImageFile || this.featuredProduct2ImageFile || 
                           this.featuredProduct3ImageFile || this.categoryItem1ImageFile || 
                           this.categoryItem2ImageFile || this.categoryItem3ImageFile || 
                           this.artisanImageFile || this.diningInfoImageFile;
          
          if (hasImages) {
            const imageFormData = new FormData();
            
            if (this.heroImageFile) imageFormData.append('heroImage', this.heroImageFile);
            if (this.heroBackgroundImageFile) imageFormData.append('heroBackgroundImage', this.heroBackgroundImageFile);
            if (this.featuredProduct1ImageFile) imageFormData.append('featuredProduct1Image', this.featuredProduct1ImageFile);
            if (this.featuredProduct2ImageFile) imageFormData.append('featuredProduct2Image', this.featuredProduct2ImageFile);
            if (this.featuredProduct3ImageFile) imageFormData.append('featuredProduct3Image', this.featuredProduct3ImageFile);
            if (this.categoryItem1ImageFile) imageFormData.append('categoryItem1Image', this.categoryItem1ImageFile);
            if (this.categoryItem2ImageFile) imageFormData.append('categoryItem2Image', this.categoryItem2ImageFile);
            if (this.categoryItem3ImageFile) imageFormData.append('categoryItem3Image', this.categoryItem3ImageFile);
            if (this.artisanImageFile) imageFormData.append('artisanImage', this.artisanImageFile);
            if (this.diningInfoImageFile) imageFormData.append('diningInfoImage', this.diningInfoImageFile);
            
            this.store.dispatch(updateHomepage3Images({ 
              id: currentData.id, 
              imageData: imageFormData 
            }));
            
            // Reset image files
            this.heroImageFile = null;
            this.heroBackgroundImageFile = null;
            this.featuredProduct1ImageFile = null;
            this.featuredProduct2ImageFile = null;
            this.featuredProduct3ImageFile = null;
            this.categoryItem1ImageFile = null;
            this.categoryItem2ImageFile = null;
            this.categoryItem3ImageFile = null;
            this.artisanImageFile = null;
            this.diningInfoImageFile = null;
          }
          
          // Exit editing mode
          this.editingMode = false;
          this.editingSection = null;
          this.editingField = null;
        }
      }).unsubscribe();
    }
  }

  startEditing(section: string, field: string) {
    if (this.editingMode && this.isAdmin) {
      this.editingSection = section;
      this.editingField = field;
    }
  }

  updateContent(field: string, value: string) {
    if (this.content) {
      this.content[field] = value;
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
        // Store the file for upload
        switch (section) {
          case 'heroImage':
            this.heroImageFile = file;
            break;
          case 'heroBackgroundImage':
            this.heroBackgroundImageFile = file;
            break;
          case 'featuredProduct1Image':
            this.featuredProduct1ImageFile = file;
            break;
          case 'featuredProduct2Image':
            this.featuredProduct2ImageFile = file;
            break;
          case 'featuredProduct3Image':
            this.featuredProduct3ImageFile = file;
            break;
          case 'categoryItem1Image':
            this.categoryItem1ImageFile = file;
            break;
          case 'categoryItem2Image':
            this.categoryItem2ImageFile = file;
            break;
          case 'categoryItem3Image':
            this.categoryItem3ImageFile = file;
            break;
          case 'artisanImage':
            this.artisanImageFile = file;
            break;
          case 'diningInfoImage':
            this.diningInfoImageFile = file;
            break;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Update the preview in the content object for immediate visual feedback
          if (section === 'heroImage') {
            this.content.heroImage = e.target.result;
          } else if (section === 'heroBackgroundImage') {
            this.content.heroBackgroundImage = e.target.result;
            const heroElement = document.querySelector('.hero') as HTMLElement;
            if (heroElement) {
              heroElement.style.setProperty('--hero-bg-image', `url('${e.target.result}')`);
            }
          } else if (section === 'featuredProduct1Image') {
            this.content.featuredProduct1Image = e.target.result;
          } else if (section === 'featuredProduct2Image') {
            this.content.featuredProduct2Image = e.target.result;
          } else if (section === 'featuredProduct3Image') {
            this.content.featuredProduct3Image = e.target.result;
          } else if (section === 'categoryItem1Image') {
            this.content.categoryItem1Image = e.target.result;
          } else if (section === 'categoryItem2Image') {
            this.content.categoryItem2Image = e.target.result;
          } else if (section === 'categoryItem3Image') {
            this.content.categoryItem3Image = e.target.result;
          } else if (section === 'artisanImage') {
            this.content.artisanImage = e.target.result;
          } else if (section === 'diningInfoImage') {
            this.content.diningInfoImage = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}