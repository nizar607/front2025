import { Component, OnInit, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { fetchHomepage2Data, updateHomepage2Data, updateHomepage2Images } from '../../store/Homepage2/homepage2.action';
import { selectHomepage2Data, selectHomepage2Loading, selectHomepage2Error } from '../../store/Homepage2/homepage2-selector';
import { Homepage2Model } from '../../store/Homepage2/homepage2.model';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-homepage-v2',
  templateUrl: './homepage-v2.component.html',
  styleUrls: ['./homepage-v2.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomepageV2Component implements OnInit, AfterViewInit, OnDestroy {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;
  content$: Observable<Homepage2Model | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  // Image files for upload
  heroImageFile: File | null = null;
  artisanImageFile: File | null = null;
  featuredProduct1ImageFile: File | null = null;
  featuredProduct2ImageFile: File | null = null;
  featuredProduct3ImageFile: File | null = null;

  // Default content as fallback (flat structure following Homepage2Model)
  defaultContent: Homepage2Model = {
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
    
    // Experience Section
    experienceTitle: 'Loading...',
    experienceSubtitle: 'Loading...',
    
    // Gallery Section
    galleryTitle: 'Loading...',
    gallerySubtitle: 'Loading...',
    
    // Features Section
    featuresTitle: 'Loading...',
    featuresSubtitle: 'Loading...',

    // Feature 1
    feature1Number: '01',
    feature1Title: 'Exceptional Craftsmanship',
    feature1Description: 'Every piece is handcrafted by master artisans using time-honored techniques and the finest materials sourced globally.',
    feature1Link: 'Discover Process →',
    feature1Image: 'homepage-default-feature-one.png',

    // Feature 2
    feature2Number: '02',
    feature2Title: 'Sustainable Materials',
    feature2Description: 'We source only the finest sustainable materials, ensuring each piece is both beautiful and environmentally responsible.',
    feature2Link: 'Learn More →',
    feature2Image: 'homepage-default-feature-two.png',

    // Feature 3
    feature3Number: '03',
    feature3Title: 'Lifetime Quality',
    feature3Description: 'Built to last generations, our furniture comes with a lifetime guarantee of quality and craftsmanship.',
    feature3Link: 'View Warranty →',
    feature3Image: 'homepage-default-feature-three.png',
    
    // Products Section
    productsTitle: 'Loading...',
    
    // Why Choose Section
    whyChooseTitle: 'Loading...',
    
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
    diningInfoImage: '',
    
    isActive: true
  };

  // Content structure following the flat model
  content: Homepage2Model = { ...this.defaultContent };

  constructor(public store: Store) {
    this.content$ = this.store.select(selectHomepage2Data);
    this.loading$ = this.store.select(selectHomepage2Loading);
    this.error$ = this.store.select(selectHomepage2Error);
  }

  ngOnInit(): void {
    // Fetch homepage data from store
    this.store.dispatch(fetchHomepage2Data());
    
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    
    this.subscription.add(
      this.store.select(getUser).subscribe(user => {
        this.connectedUser = user;
        this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
      })
    );

    // Subscribe to Homepage2 data and update content
    this.subscription.add(
      this.content$.subscribe(data => {
        if (data) {
          // Merge with default content and update flat structure
          this.content = {
            ...this.defaultContent,
            ...data
          };
          console.log('Homepage2 content loaded:', this.content);
        } else {
          this.content = { ...this.defaultContent };
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.initializeInteractions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeInteractions(): void {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.background = 'rgba(254, 254, 254, 0.98)';
          navbar.style.boxShadow = '0 2px 25px rgba(0,0,0,0.15)';
        } else {
          navbar.style.background = 'rgba(254, 254, 254, 0.95)';
          navbar.style.boxShadow = 'none';
        }
      }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form') as HTMLFormElement;
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('.newsletter-btn') as HTMLButtonElement;
        const input = this.querySelector('.newsletter-input') as HTMLInputElement;
        
        if (button && input) {
          button.textContent = 'Subscribed!';
          button.style.background = '#27ae60';
          input.value = '';
          
          setTimeout(() => {
            button.textContent = 'Subscribe';
            button.style.background = '#d4af37';
          }, 3000);
        }
      });
    }

    // Gallery filtering
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        (e.target as HTMLElement).classList.add('active');
        
        const category = (e.target as HTMLElement).getAttribute('data-category');
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
          const itemElement = item as HTMLElement;
          if (category === 'all' || item.classList.contains(category || '')) {
            itemElement.style.display = 'block';
            setTimeout(() => {
              itemElement.style.opacity = '1';
              itemElement.style.transform = 'translateY(0)';
            }, 100);
          } else {
            itemElement.style.opacity = '0';
            itemElement.style.transform = 'translateY(20px)';
            setTimeout(() => {
              itemElement.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Quick view functionality
    document.querySelectorAll('.quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemInfo = (e.target as HTMLElement).closest('.item-info');
        const itemName = itemInfo?.querySelector('h3')?.textContent;
        if (itemName) {
          alert(`Quick view for ${itemName} - This would open a modal in a real application`);
        }
      });
    });
  }

  // Helper methods for image URLs
  getImageUrl(field: string): string {
    const imageValue = (this.content as any)[field];
    // If image starts with 'data:', it's a local preview (base64)
    if (imageValue && imageValue.startsWith('data:')) {
      return imageValue;
    }
    // Otherwise, use backend URL or return the URL as is if it's already a full URL
    if (imageValue && imageValue.startsWith('http')) {
      return imageValue;
    }
    return imageValue ? `http://localhost:8080/api/files/${imageValue}` : '';
  }

  // Admin control methods
  toggleEditMode() {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
      if (!this.editingMode) {
        this.editingSection = null;
        this.editingField = null;
      }
    }
  }

  saveChanges(): void {
    if (this.isAdmin && this.editingMode) {
      console.log('Saving homepage content changes:', this.content);

      // Prepare Homepage data (without images for content update)
      const homepageData = {
        ...this.content
      };

      // Check if this is an update (has ID) or new creation
      if (this.content.id) {
        // Update existing Homepage data
        console.log(homepageData);
        this.store.dispatch(updateHomepage2Data({
          id: parseInt(this.content.id),
          updatedData: homepageData
        }));

        // Handle image uploads separately if there are any files
        if (this.heroImageFile || this.artisanImageFile || this.featuredProduct1ImageFile || this.featuredProduct2ImageFile || this.featuredProduct3ImageFile) {
          const imageFormData = new FormData();
          console.log("updating images here");

          // Add hero image if exists
          if (this.heroImageFile) {
            imageFormData.append('heroImage', this.heroImageFile);
          }

          // Add artisan image if exists
          if (this.artisanImageFile) {
            imageFormData.append('artisanImage', this.artisanImageFile);
          }

          // Add featured product images if they exist
          if (this.featuredProduct1ImageFile) {
            imageFormData.append('featuredProduct1Image', this.featuredProduct1ImageFile);
          }

          if (this.featuredProduct2ImageFile) {
            imageFormData.append('featuredProduct2Image', this.featuredProduct2ImageFile);
          }

          if (this.featuredProduct3ImageFile) {
            imageFormData.append('featuredProduct3Image', this.featuredProduct3ImageFile);
          }

          // Dispatch image update action
          this.store.dispatch(updateHomepage2Images({ id: parseInt(this.content.id), imageData: imageFormData }));
        }
      }

      // Reset image files after saving
      this.heroImageFile = null;
      this.artisanImageFile = null;
      this.featuredProduct1ImageFile = null;
      this.featuredProduct2ImageFile = null;
      this.featuredProduct3ImageFile = null;

      this.editingMode = false;
      this.editingSection = null;
      this.editingField = null;
    }
  }

  startEditing(section: string, field: string) {
    if (this.isAdmin && this.editingMode) {
      this.editingSection = section;
      this.editingField = field;
    }
  }

  // Content editing methods for flat structure
  updateContent(field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content as any)[field] = value;
    }
  }

  // Image upload methods
  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageUpload(event: any, field: string): void {
    const file = event.target.files[0];
    if (file && this.isAdmin && this.editingMode) {
      // Store the file for later upload based on field name
      if(field=='heroImage'){
        this.heroImageFile = file;
      }else if (field === 'heroBackgroundImage') {
        this.heroImageFile = file;
      } else if (field === 'artisanImage') {
        this.artisanImageFile = file;
      } else if (field === 'featuredProduct1Image') {
        this.featuredProduct1ImageFile = file;
      } else if (field === 'featuredProduct2Image') {
        this.featuredProduct2ImageFile = file;
      } else if (field === 'featuredProduct3Image') {
        this.featuredProduct3ImageFile = file;
      }

      // Create preview URL for immediate display
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        (this.content as any)[field] = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }
}
