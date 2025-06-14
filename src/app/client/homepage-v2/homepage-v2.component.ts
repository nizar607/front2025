import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-homepage-v2',
  templateUrl: './homepage-v2.component.html',
  styleUrls: ['./homepage-v2.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomepageV2Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
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
}
