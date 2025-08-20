import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';
import { AuthenticationService } from '../../core/services/auth.service';
import { fetchHomepage1Data, addHomepage1Data, updateHomepage1Data, updateHomepage1Images } from '../../store/Homepage1/homepage1.action';
import { selectHomepage1Data, selectHomepage1Loading, selectHomepage1Error } from '../../store/Homepage1/homepage1-selector';
import { Homepage1Model } from '../../store/Homepage1/homepage1.model';

import gsap from 'gsap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit, OnDestroy {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;

  // NgRx observables
  homepageData$: Observable<Homepage1Model | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  // Image files for upload
  heroImageFile: File | null = null;
  heroBackgroundImageFile: File | null = null;
  featuredImageFiles: { [key: number]: File } = {};
  categoryImageFiles: { [key: number]: File } = {};
  artisanImageFile: File | null = null;
  diningImageFile: File | null = null;

  // Default content as fallback (flat structure)
  defaultContent: Homepage1Model = {
    // Hero Section
    heroTitle: 'Loading...',
    heroSubtitle: 'Please wait while we load your content',
    heroPrimaryCta: 'Explore Collection',
    heroSecondaryCta: 'Plan Your Room in 3D',
    heroBackgroundImage: '',
    
    // Featured Section
    featuredTitle: 'Loading Collections...',
    featuredSubtitle: 'Please wait while we fetch the latest content',
    
    // Featured Products
    featuredProduct1Image: '',
    featuredProduct1Category: 'Loading...',
    featuredProduct1Name: 'Loading product...',
    featuredProduct1Description: 'Please wait while we load product details...',
    featuredProduct1Price: '...',
    
    featuredProduct2Image: '',
    featuredProduct2Category: 'Loading...',
    featuredProduct2Name: 'Loading product...',
    featuredProduct2Description: 'Please wait while we load product details...',
    featuredProduct2Price: '...',
    
    featuredProduct3Image: '',
    featuredProduct3Category: 'Loading...',
    featuredProduct3Name: 'Loading product...',
    featuredProduct3Description: 'Please wait while we load product details...',
    featuredProduct3Price: '...',
    
    // Categories Section
    categoriesTitle: 'Loading Categories...',
    categoriesSubtitle: 'Please wait while we load categories...',
    
    // Category Items
    categoryItem1Image: '',
    categoryItem1Name: 'Loading...',
    categoryItem1Count: '...',
    
    categoryItem2Image: '',
    categoryItem2Name: 'Loading...',
    categoryItem2Count: '...',
    
    categoryItem3Image: '',
    categoryItem3Name: 'Loading...',
    categoryItem3Count: '...',
    
    
    // Newsletter Section
    newsletterTitle: 'Loading...',
    newsletterText: 'Please wait while we load content...',
    
    isActive: true
  };

  // Content structure following the flat model
  content: Homepage1Model = { ...this.defaultContent };

  constructor(
    public store: Store,
    private authService: AuthenticationService
  ) {
    // Initialize observables
    this.homepageData$ = this.store.select(selectHomepage1Data);
    this.loading$ = this.store.select(selectHomepage1Loading);
    this.error$ = this.store.select(selectHomepage1Error);
  }


  ngOnInit() {
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    
    // Dispatch action to fetch Homepage1 data
    this.store.dispatch(fetchHomepage1Data());

    // Subscribe to Homepage data and update content
    this.subscription.add(
      this.homepageData$.subscribe(data => {
        if (data) {
          // Merge with default content and update flat structure
          this.content = {
            ...this.defaultContent,
            ...data
          };
          console.log('Homepage content loaded:', this.content);
        } else {
          this.content = { ...this.defaultContent };
        }
      })
    );
    
    // Get connected user and check admin status
    this.store.select(getUser).subscribe(user => {
      this.connectedUser = user;
      console.log("connected user ", this.connectedUser);

      // Check if user is admin
      this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
    });

    // Check admin status from auth service as well
    this.connectedUser = this.authService.currentUserValue;
    if (this.connectedUser && this.connectedUser.roles && this.connectedUser.roles.length > 0) {
      this.isAdmin = this.connectedUser.roles[0] === 'ROLE_ADMIN';
    }

    // Temporary fix: Force admin mode and editing mode for testing
    this.isAdmin = true;
    this.editingMode = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    // GSAP animations setup
    

    gsap.set("svg", { visibility: "visible" });
    gsap.to("#headStripe", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1
    });

    gsap.to("#spaceman", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1
    });

    gsap.to("#craterSmall", {
      x: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut"
    });

    gsap.to("#craterBig", {
      x: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut"
    });

    gsap.to("#planet", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "50% 50%"
    });


    gsap.to("#starsBig g", {
      rotation: "random(-30,30)",
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.fromTo(
      "#starsSmall g",
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 });

    gsap.to("#circlesSmall circle", {
      y: -4,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1
    });

    gsap.to("#circlesBig circle", {
      y: -2,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1
    });


    gsap.set("#glassShine", { x: -68 });

    gsap.to("#glassShine", {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      repeat: -1,
      repeatDelay: 8,
      delay: 2
    });
  }

  // Admin editing methods
  toggleEditMode(): void {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
      this.editingSection = null;
      this.editingField = null;
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
        // Update existing Homepage1 data
        console.log('Updating homepage data:', homepageData);
        this.store.dispatch(updateHomepage1Data({
          id: this.content.id,
          updatedData: homepageData
        }));

        // Handle image uploads separately if there are any files
        if (this.heroImageFile || this.heroBackgroundImageFile || Object.keys(this.featuredImageFiles).length > 0 || 
            Object.keys(this.categoryImageFiles).length > 0 || this.artisanImageFile || this.diningImageFile) {
          const imageFormData = new FormData();
          console.log("Updating images");

          // Add hero image if exists
          if (this.heroImageFile) {
            imageFormData.append('heroImage', this.heroImageFile);
          }

          // Add hero background image if exists
          if (this.heroBackgroundImageFile) {
            imageFormData.append('heroBackgroundImage', this.heroBackgroundImageFile);
          }

          // Add featured product images if exist
          Object.keys(this.featuredImageFiles).forEach(index => {
            if (this.featuredImageFiles[parseInt(index)]) {
              imageFormData.append(`featuredProduct${parseInt(index) + 1}Image`, this.featuredImageFiles[parseInt(index)]);
            }
          });

          // Add category images if exist
          Object.keys(this.categoryImageFiles).forEach(index => {
            if (this.categoryImageFiles[parseInt(index)]) {
              imageFormData.append(`categoryItem${parseInt(index) + 1}Image`, this.categoryImageFiles[parseInt(index)]);
            }
          });

          // Add artisan image if exists
          if (this.artisanImageFile) {
            imageFormData.append('artisanImage', this.artisanImageFile);
          }

          // Add dining image if exists
          if (this.diningImageFile) {
            imageFormData.append('diningInfoImage', this.diningImageFile);
          }

          // Dispatch image update action
          this.store.dispatch(updateHomepage1Images({ id: this.content.id, imageData: imageFormData }));
        }
      }

      // Reset image files after saving
      this.heroImageFile = null;
      this.heroBackgroundImageFile = null;
      this.featuredImageFiles = {};
      this.categoryImageFiles = {};
      this.artisanImageFile = null;
      this.diningImageFile = null;

      this.editingMode = false;
      this.editingSection = null;
      this.editingField = null;
    }
  }

  startEditing(section: string, field: string): void {
    if (this.isAdmin && this.editingMode) {
      this.editingSection = section;
      this.editingField = field;
      console.log(`Editing ${section}.${field}`);
    }
  }

  updateContent(field: string, value: string): void {
    if (this.isAdmin && this.editingMode) {
      this.content = {
        ...this.content,
        [field]: value
      };
    }
  }

  updateProductContent(productIndex: number, field: string, value: string): void {
    if (this.isAdmin && this.editingMode) {
      const productNumber = productIndex + 1;
      const flatField = `featuredProduct${productNumber}${field.charAt(0).toUpperCase() + field.slice(1)}`;
      
      this.content = {
        ...this.content,
        [flatField]: value
      };
    }
  }

  updateCategoryContent(categoryIndex: number, field: string, value: string): void {
    if (this.isAdmin && this.editingMode) {
      const categoryNumber = categoryIndex + 1;
      const flatField = `categoryItem${categoryNumber}${field.charAt(0).toUpperCase() + field.slice(1)}`;
      
      this.content = {
        ...this.content,
        [flatField]: value
      };
    }
  }
  
  updateArtisanContent(field: string, value: string): void {
    if (this.isAdmin && this.editingMode) {
      const flatField = `artisan${field.charAt(0).toUpperCase() + field.slice(1)}`;
      
      this.content = {
        ...this.content,
        [flatField]: value
      };
    }
  }
  
  updateDiningContent(field: string, value: string): void {
    if (this.isAdmin && this.editingMode) {
      const flatField = `diningInfo${field.charAt(0).toUpperCase() + field.slice(1)}`;
      
      this.content = {
        ...this.content,
        [flatField]: value
      };
    }
  }

  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerFileInputForProduct(index: number) {
    const fileInput = document.getElementById(`product-${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerFileInputForProductOdd(index: number) {
    const fileInput = document.getElementById(`product-odd-${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerFileInputForCategory(index: number) {
    const fileInput = document.getElementById(`category-${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageUpload(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file && this.isAdmin && this.editingMode) {
      // Store the file for later upload based on field name
      if (fieldName === 'hero') {
        this.heroImageFile = file;
      } else if (fieldName === 'heroBackground') {
        this.heroBackgroundImageFile = file;
      } else if (fieldName.startsWith('featuredProduct')) {
        const productNumber = fieldName.replace('featuredProduct', '').replace('Image', '');
        this.featuredImageFiles[parseInt(productNumber) - 1] = file;
      } else if (fieldName.startsWith('categoryItem')) {
        const categoryNumber = fieldName.replace('categoryItem', '').replace('Image', '');
        this.categoryImageFiles[parseInt(categoryNumber) - 1] = file;
      } else if (fieldName === 'artisan') {
        this.artisanImageFile = file;
      } else if (fieldName === 'dining') {
        this.diningImageFile = file;
      }

      // Create preview URL for immediate display
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        
        // Update the content with the new image URL
        if (fieldName === 'hero') {
          this.content = { ...this.content, heroImage: imageUrl };
        } else if (fieldName === 'heroBackground') {
          this.content = { ...this.content, heroBackgroundImage: imageUrl };
        } else if (fieldName.startsWith('featuredProduct')) {
          const imageField = fieldName.endsWith('Image') ? fieldName : `${fieldName}Image`;
          this.content = { ...this.content, [imageField]: imageUrl };
        } else if (fieldName.startsWith('categoryItem')) {
          const imageField = fieldName.endsWith('Image') ? fieldName : `${fieldName}Image`;
          this.content = { ...this.content, [imageField]: imageUrl };
        } else if (fieldName === 'artisan') {
          this.content = { ...this.content, artisanImage: imageUrl };
        } else if (fieldName === 'dining') {
          this.content = { ...this.content, diningInfoImage: imageUrl };
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Helper methods for image URLs
  getHeroImageUrl(): string {
    return this.getImageUrl(this.content.heroBackgroundImage);
  }

  getProductImageUrl(imageUrl?: string): string {
    return this.getImageUrl(imageUrl);
  }

  getCategoryImageUrl(imageUrl?: string): string {
    return this.getImageUrl(imageUrl);
  }
  
  getArtisanImageUrl(): string {
    return this.getImageUrl(this.content.artisanImage);
  }
  
  getDiningImageUrl(): string {
    return this.getImageUrl(this.content.diningInfoImage);
  }
  
  getImageUrl(imageUrl?: string): string {
    if (!imageUrl) return '';
    
    // If image starts with 'data:', it's a local preview (base64)
    if (imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Otherwise, construct backend URL
    return `http://localhost:8080/api/files/${imageUrl}`;
  }
  
  // Additional helper methods for file input triggers
  triggerArtisanImageInput(): void {
    const fileInput = document.getElementById('artisan-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  triggerDiningImageInput(): void {
    const fileInput = document.getElementById('dining-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

}
