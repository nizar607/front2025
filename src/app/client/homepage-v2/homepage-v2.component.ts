import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { fetchUser } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-homepage-v2',
  templateUrl: './homepage-v2.component.html',
  styleUrls: ['./homepage-v2.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomepageV2Component implements OnInit, AfterViewInit {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingSection: string | null = null;
  editingField: string | null = null;

  // Homepage content data structure
  content = {
    hero: {
      title: 'Luxury Redefined<br>For Modern Homes',
      subtitle: 'Experience the pinnacle of contemporary design with our exclusive collection of handcrafted furniture.',
      primaryCta: 'Explore Collection',
      secondaryCta: 'View Featured',
      backgroundImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    experience: {
      title: 'Crafting Excellence',
      subtitle: 'Discover what makes our furniture extraordinary',
      cards: [
        {
          title: 'Exceptional Craftsmanship',
          description: 'Every piece is handcrafted by master artisans using time-honored techniques and the finest materials sourced globally. Our commitment to excellence ensures furniture that lasts generations.',
          link: 'Discover Process →',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Bespoke Design',
          description: 'Collaborate with our design team to create furniture that perfectly reflects your vision and lifestyle.',
          link: 'Start Designing →',
          image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Sustainable Materials',
          description: 'Committed to environmental responsibility through sustainable sourcing and eco-friendly practices.',
          link: 'Learn More →',
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Lifetime Warranty',
          description: 'We stand behind our craftsmanship with comprehensive warranty coverage and dedicated support.',
          link: 'View Coverage →',
          image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    gallery: {
      title: 'Signature Collection',
      subtitle: 'Discover pieces that redefine luxury living',
      products: [
        {
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          name: 'Venetian Sectional',
          price: '$4,299',
          button: 'Quick View'
        },
        {
          image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          name: 'Heritage Dining Set',
          price: '$3,199',
          button: 'Quick View'
        },
        {
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          name: 'Metropolitan Suite',
          price: '$2,899',
          button: 'Quick View'
        },
        {
          image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          name: 'Sanctuary Collection',
          price: 'From $1,899',
          button: 'Quick View'
        }
      ],
      artisan: {
        title: 'Artisan Spotlight',
        description: 'Meet our master craftspeople who bring decades of expertise to every piece. Each item tells a story of dedication, skill, and passion for exceptional design.',
        link: 'Meet the Team →',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      dining: {
        title: 'Dining Experience',
        description: 'Transform every meal into a memorable occasion',
        button: 'Explore Collection',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    },
    newsletter: {
      title: 'Stay Connected',
      text: 'Be the first to discover our latest collections, exclusive designs, and special offers crafted just for you.'
    },
    stats: {
      items: [
        {
          number: '25+',
          label: 'Years Experience'
        },
        {
          number: '10k+',
          label: 'Happy Clients'
        },
        {
          number: '50+',
          label: 'Master Artisans'
        }
      ]
    },
    whyChoose: {
      title: 'Why Choose Us',
      features: [
        'Free Design Consultation',
        'White Glove Delivery',
        'Lifetime Support'
      ]
    },
    artisan: {
      title: 'Artisan Spotlight',
      description: 'Meet our master craftspeople who bring decades of expertise to every piece. Each item tells a story of passion, precision, and uncompromising quality.',
      link: 'Meet the Team →',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  };

  constructor(public store: Store) { }

  ngOnInit(): void {
    // Dispatch fetchUser action to get user from localStorage
    this.store.dispatch(fetchUser());
    
    this.store.select(getUser).subscribe(user => {
      this.connectedUser = user;
      this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
    });
  }

  ngAfterViewInit(): void {
    this.initializeInteractions();
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
    if (this.isAdmin && this.editingMode) {
      this.editingSection = section;
      this.editingField = field;
    }
  }

  // Content editing methods
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
      (this.content.gallery.products[productIndex] as any)[field] = value;
    }
  }

  updateExperienceContent(cardIndex: number, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content.experience.cards[cardIndex] as any)[field] = value;
    }
  }

  updateStatsContent(statIndex: number, field: string, value: string) {
    if (this.isAdmin && this.editingMode) {
      (this.content.stats.items[statIndex] as any)[field] = value;
    }
  }

  updateFeatureContent(featureIndex: number, value: string) {
    if (this.isAdmin && this.editingMode) {
      this.content.whyChoose.features[featureIndex] = value;
    }
  }

  // Image upload methods
  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerFileInputForProduct(index: number) {
    const fileInput = document.getElementById(`product-v2-${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageUpload(event: any, section: string, index?: number | string) {
    if (this.isAdmin && this.editingMode) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (section === 'gallery' && typeof index === 'number') {
            this.content.gallery.products[index].image = e.target.result;
          } else if (section === 'experience' && typeof index === 'number') {
            this.content.experience.cards[index].image = e.target.result;
          } else if (section === 'artisan' && index === 'image') {
            this.content.artisan.image = e.target.result;
          } else if (section === 'gallery.dining' && index === 'image') {
            this.content.gallery.dining.image = e.target.result;
          } else if (section === 'hero') {
            this.content.hero.backgroundImage = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
