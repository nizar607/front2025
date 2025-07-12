import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../core/services/auth.service';
import { createCompanyWithImage } from '../../store/Company/company.action';

interface CompanyValueDTO {
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
}

interface TeamMemberDTO {
  name: string;
  position: string;
  bio: string;
  displayOrder: number;
  image: string;
}

interface CompanyStatisticDTO {
  value: string;
  label: string;
  displayOrder: number;
}

interface AboutContent {
  id?: number;
  companyId?: number;
  coverImage: string;
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyContent: string;
  storyText1: string;
  storyText2: string;
  storyText3: string;
  storyImage: string;
  valuesTitle: string;
  valuesDescription: string;
  companyValues: CompanyValueDTO[];
  teamTitle: string;
  teamDescription: string;
  teamMembers: TeamMemberDTO[];

  statsTitle: string;
  companyStatistics: CompanyStatisticDTO[];
  ctaTitle: string;
  ctaDescription: string;
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  hoveredValue: number = -1;
  currentTestimonial: number = 0;
  testimonialInterval: any;

  // Admin functionality
  isAdmin: boolean = false;
  editingMode: boolean = false;
  connectedUser: any = null;
  
  // Image files for upload
  coverImageFile: File | null = null;
  storyImageFile: File | null = null;
  teamImageFiles: { [key: number]: File } = {};

  // Content structure following the DTO
  content: AboutContent = {
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    heroTitle: 'About FORMA',
    heroSubtitle: 'Crafting Timeless Elegance Since 1987',
    storyTitle: 'Our Story',
    storyContent: 'Born from a passion for exceptional design and uncompromising quality, FORMA has been creating furniture that transcends trends for over three decades.',
    storyText1: 'FORMA began in 1987 in a small workshop in Milan, where master craftsman Giovanni Rossi combined traditional Italian woodworking techniques with contemporary design sensibilities. What started as a family business has evolved into a globally recognized brand synonymous with luxury and sophistication.',
    storyText2: 'Our commitment to excellence is evident in every piece we create. We source only the finest materials from sustainable suppliers and work with skilled artisans who share our dedication to perfection. Each piece of furniture is not just a product, but a work of art that tells a story of craftsmanship and care.',
    storyText3: 'Today, FORMA continues to push boundaries while honoring our heritage, creating furniture that seamlessly blends form and function for the modern home.',
    storyImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    valuesTitle: 'Our Values',
    valuesDescription: 'The principles that guide everything we do, from design conception to final delivery.',
    companyValues: [
      {
        title: 'Quality First',
        description: 'We never compromise on quality. Every piece is crafted with attention to detail and built to last generations.',
        icon: 'bi bi-star',
        displayOrder: 1
      },
      {
        title: 'Sustainable Design',
        description: 'Environmental responsibility guides our choices. We use eco-friendly materials and sustainable practices.',
        icon: 'bi bi-tree',
        displayOrder: 2
      },
      {
        title: 'Customer Focus',
        description: 'Your satisfaction is our priority. We listen, adapt, and deliver exactly what you envision for your space.',
        icon: 'bi bi-people',
        displayOrder: 3
      },
      {
        title: 'Innovation',
        description: 'We embrace new technologies and design trends while respecting timeless craftsmanship traditions.',
        icon: 'bi bi-lightbulb',
        displayOrder: 4
      }
    ],
    teamTitle: 'Meet Our Team',
    teamDescription: 'The passionate individuals behind every FORMA creation.',
    teamMembers: [
      {
        name: 'Sarah Johnson',
        position: 'Founder & CEO',
        bio: 'With over 20 years in furniture design, Sarah leads our vision of creating beautiful, functional spaces.',
        image: 'https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg',
        displayOrder: 1
      },
      {
        name: 'Michael Chen',
        position: 'Head of Design',
        bio: 'Michael brings innovative design concepts to life, blending modern aesthetics with practical functionality.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        displayOrder: 2
      },
      {
        name: 'Emily Rodriguez',
        position: 'Quality Assurance Director',
        bio: 'Emily ensures every piece meets our exacting standards before it reaches your home.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        displayOrder: 3
      },
      {
        name: 'David Thompson',
        position: 'Customer Experience Manager',
        bio: 'David leads our customer service team, ensuring every interaction exceeds expectations.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        displayOrder: 4
      }
    ],
    statsTitle: 'FORMA by the Numbers',
    companyStatistics: [
      { value: '37', label: 'Years of Excellence', displayOrder: 1 },
      { value: '50K+', label: 'Happy Customers', displayOrder: 2 },
      { value: '200+', label: 'Unique Designs', displayOrder: 3 },
      { value: '15', label: 'Countries Served', displayOrder: 4 }
    ],
    ctaTitle: 'Experience FORMA',
    ctaDescription: 'Visit our showroom to see our craftsmanship up close, or browse our collection online to find the perfect piece for your home. Let us help you create spaces that inspire.',
  };

  constructor(
    private authService: AuthenticationService,
    private store: Store
  ) { }

  ngOnInit(): void {

    // Check admin status
    this.connectedUser = this.authService.currentUserValue;
    if (this.connectedUser && this.connectedUser.roles && this.connectedUser.roles.length > 0) {
      this.isAdmin = this.connectedUser.roles[0] === 'ROLE_ADMIN';
    }

    // Temporary fix: Force admin mode and editing mode for testing
    this.isAdmin = true;
    this.editingMode = true;
  }

  ngOnDestroy(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  // Admin functionality methods
  toggleEditMode(): void {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
    }
  }

  updateContent(section: string, field: string, value: string): void {
    switch (section) {
      case 'hero':
        if (field === 'Title') {
          this.content.heroTitle = value;
        } else if (field === 'Subtitle') {
          this.content.heroSubtitle = value;
        }
        break;
      case 'story':
        if (field === 'Title') {
          this.content.storyTitle = value;
        } else if (field === 'Content') {
          this.content.storyContent = value;
        } else if (field === 'Text1') {
          this.content.storyText1 = value;
        } else if (field === 'Text2') {
          this.content.storyText2 = value;
        } else if (field === 'Text3') {
          this.content.storyText3 = value;
        }
        break;
      case 'values':
        if (field === 'Title') {
          this.content.valuesTitle = value;
        } else if (field === 'Description') {
          this.content.valuesDescription = value;
        }
        break;
      case 'team':
        if (field === 'Title') {
          this.content.teamTitle = value;
        } else if (field === 'Description') {
          this.content.teamDescription = value;
        }
        break;
      case 'stats':
        if (field === 'Title') {
          this.content.statsTitle = value;
        }
        break;
      case 'cta':
        if (field === 'Title') {
          this.content.ctaTitle = value;
        } else if (field === 'Description') {
          this.content.ctaDescription = value;
        }
        break;
    }
  }

  updateValueContent(index: number, field: string, value: string): void {
    if (this.editingMode && this.isAdmin && this.content.companyValues[index]) {
      (this.content.companyValues[index] as any)[field] = value;
    }
  }

  updateTeamMemberContent(index: number, field: string, value: string): void {
    if (this.editingMode && this.isAdmin && this.content.teamMembers[index]) {
      (this.content.teamMembers[index] as any)[field] = value;
    }
  }

  updateStatContent(index: number, field: string, value: string): void {
    if (this.editingMode && this.isAdmin && this.content.companyStatistics[index]) {
      (this.content.companyStatistics[index] as any)[field] = value;
    }
  }

  onImageUpload(event: any, section: string, index?: number): void {
    const file = event.target.files[0];
    if (file && this.editingMode && this.isAdmin) {
      // Store the file for later upload
      if (section === 'cover') {
        this.coverImageFile = file;
      } else if (section === 'story') {
        this.storyImageFile = file;
      } else if (section === 'team' && index !== undefined) {
        this.teamImageFiles[index] = file;
      }

      // Create preview URL for immediate display
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;

        if (section === 'cover') {
          this.content.coverImage = imageUrl;
        } else if (section === 'story') {
          this.content.storyImage = imageUrl;
        } else if (section === 'team' && index !== undefined) {
          this.content.teamMembers[index].image = imageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  startEditing(section: string, field: string): void {
    if (this.editingMode && this.isAdmin) {
      console.log(`Editing ${section}.${field}`);
    }
  }

  saveChanges(): void {
    if (this.editingMode && this.isAdmin) {
      console.log('Saving changes:', this.content);
      
      // Prepare company data (excluding images)
      const companyData = {
        ...this.content,
        // Remove image URLs as they will be handled separately
        coverImage: undefined,
        storyImage: undefined,
        teamMembers: this.content.teamMembers.map(member => ({
          ...member,
          image: undefined
        }))
      };

      // Determine which image to upload (prioritize cover image, then story image)
      let imageFile: File | null = null;
      if (this.coverImageFile) {
        imageFile = this.coverImageFile;
      } else if (this.storyImageFile) {
        imageFile = this.storyImageFile;
      } else {
        // Check for team member images
        const teamImageKeys = Object.keys(this.teamImageFiles);
        if (teamImageKeys.length > 0) {
          imageFile = this.teamImageFiles[parseInt(teamImageKeys[0])];
        }
      }

      // Dispatch the chained action
      this.store.dispatch(createCompanyWithImage({ 
        companyData, 
        imageFile 
      }));
      
      // Reset image files after saving
      this.coverImageFile = null;
      this.storyImageFile = null;
      this.teamImageFiles = {};
      
      alert('Changes are being saved...');
    }
  }

  setHoveredValue(index: number): void {
    this.hoveredValue = index;
  }

  clearHoveredValue(): void {
    this.hoveredValue = -1;
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i + 1);
  }
}