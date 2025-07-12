import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';
import gsap from 'gsap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;

  // Homepage content data structure
  content = {
    hero: {
      title: 'Timeless Design<br>Modern Living',
      subtitle: 'Discover our curated collection of premium furniture and home accessories, crafted for the discerning eye and built to last generations.',
      primaryCta: 'Explore Collection',
      secondaryCta: 'Plan Your Room in 3D',
      backgroundImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    },
    featured: {
      title: 'Featured Collection',
      subtitle: 'Handpicked pieces that define contemporary elegance',
      products: [
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Living Room',
          name: 'Milano Sectional Sofa',
          description: 'A masterpiece of Italian design, featuring premium Italian leather upholstery and solid oak frame. The Milano combines unparalleled comfort with sophisticated aesthetics.',
          price: '$3,299'
        },
        {
          image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Dining Room',
          name: 'Scandinavian Dining Set',
          description: 'Clean lines meet warm wood tones in this exceptional dining collection. Crafted from sustainable Nordic oak with precision joinery and minimalist design philosophy.',
          price: '$2,499'
        },
        {
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          category: 'Bedroom',
          name: 'Contemporary Platform Bed',
          description: 'Sleek and sophisticated, this platform bed features a floating nightstand design and integrated LED lighting. Perfect for the modern bedroom sanctuary.',
          price: '$1,899'
        }
      ]
    },
    categories: {
      title: 'Shop by Category',
      subtitle: 'Find the perfect pieces for every room in your home',
      items: [
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          name: 'Living Room',
          count: '245 Products'
        },
        {
          image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          name: 'Bedroom',
          count: '180 Products'
        },
        {
          image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          name: 'Dining Room',
          count: '120 Products'
        }
      ]
    },
    newsletter: {
      title: 'Stay Inspired',
      text: 'Subscribe to our newsletter for exclusive previews, design tips, and special offers on our latest collections.'
    }
  };

  constructor(public store: Store) {}


  ngOnInit() {
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    
    // Get connected user and check admin status
    this.store.select(getUser).subscribe(user => {
      this.connectedUser = user;
      console.log("connected user ",this.connectedUser)

      // Check if user is admin
      this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
    });

    // Temporary fix: Force admin mode and editing mode for testing
    this.isAdmin = true;
    this.editingMode = true;

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
  toggleEditMode() {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
      this.editingSection = null;
      this.editingField = null;
    }
  }

  saveChanges() {
    if (this.isAdmin && this.editingMode) {
      // Here you would typically save to a backend service
      console.log('Saving homepage content changes:', this.content);
      // this.store.dispatch()
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
      (this.content.featured.products[productIndex] as any)[field] = value;
    }
  }

  updateCategoryContent(categoryIndex: number, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content.categories.items[categoryIndex] as any)[field] = value;
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

  onImageUpload(event: any, section: string, index?: number) {
    if (this.isAdmin && this.editingMode) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (section === 'hero') {
            this.content.hero.backgroundImage = e.target.result;
          } else if (section === 'featured' && index !== undefined) {
            this.content.featured.products[index].image = e.target.result;
          } else if (section === 'categories' && index !== undefined) {
            this.content.categories.items[index].image = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

}
