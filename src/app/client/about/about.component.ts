import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  
  hoveredValue: number = -1;
  currentTestimonial: number = 0;
  testimonialInterval: any;

  values = [
    {
      title: 'Quality First',
      description: 'We never compromise on quality. Every piece is crafted with attention to detail and built to last generations.',
      icon: '<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>'
    },
    {
      title: 'Sustainable Design',
      description: 'Environmental responsibility guides our choices. We use eco-friendly materials and sustainable practices.',
      icon: '<path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 14 12.5 16 16.5 16C20.5 16 22.5 18.5 22.5 18.5C21.5 16.5 17 8 17 8Z"/>'
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We listen, adapt, and deliver exactly what you envision for your space.',
      icon: '<path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>'
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and design trends while respecting timeless craftsmanship traditions.',
      icon: '<path d="M9 12L11 14L15 10M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>'
    }
  ];

  teamMembers = [
    {
      name: 'Sarah Johnson',
      position: 'Founder & CEO',
      bio: 'With over 20 years in furniture design, Sarah leads our vision of creating beautiful, functional spaces.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Michael Chen',
      position: 'Head of Design',
      bio: 'Michael brings innovative design concepts to life, blending modern aesthetics with practical functionality.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Quality Assurance Director',
      bio: 'Emily ensures every piece meets our exacting standards before it reaches your home.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'David Thompson',
      position: 'Customer Experience Manager',
      bio: 'David leads our customer service team, ensuring every interaction exceeds expectations.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  testimonials = [
    {
      name: 'Jessica Williams',
      location: 'New York, NY',
      text: 'The quality is outstanding! Our dining set has become the centerpiece of our home. Friends constantly ask where we got it.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Robert Kim',
      location: 'Los Angeles, CA',
      text: 'From ordering to delivery, everything was perfect. The customer service team was incredibly helpful throughout the process.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Maria Gonzalez',
      location: 'Miami, FL',
      text: 'I love how sustainable and beautiful their furniture is. It\'s wonderful to support a company that cares about the environment.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ];

  ngOnInit(): void {
    this.startTestimonialSlider();
  }

  ngOnDestroy(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  setHoveredValue(index: number): void {
    this.hoveredValue = index;
  }

  clearHoveredValue(): void {
    this.hoveredValue = -1;
  }

  startTestimonialSlider(): void {
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentTestimonial = this.currentTestimonial === 0 
      ? this.testimonials.length - 1 
      : this.currentTestimonial - 1;
  }

  setTestimonial(index: number): void {
    this.currentTestimonial = index;
    // Reset the timer
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
      this.startTestimonialSlider();
    }
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i + 1);
  }
}