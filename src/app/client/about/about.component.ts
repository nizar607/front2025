import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { fetchaboutusData, addaboutusData, updateaboutusData, updateaboutusImages } from '../../store/AboutUs/aboutUs.action';
import { selectaboutusData, selectDataLoading, selectDataError } from '../../store/AboutUs/aboutUs-selector';


interface CompanyValueDTO {
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
}

interface TeamMemberDTO {
  id: number,
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

  // NgRx observables
  aboutUsData$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  // Default content as fallback
  defaultContent: AboutContent = {
    coverImage: 'default-cover-image.png',
    heroTitle: 'About FORMA',
    heroSubtitle: 'Crafting Timeless Elegance Since 1987',
    storyTitle: 'Our Story',
    storyContent: 'Born from a passion for exceptional design and uncompromising quality, FORMA has been creating furniture that transcends trends for over three decades.',
    storyText1: 'FORMA began in 1987 in a small workshop in Milan.',
    storyText2: 'Our commitment to excellence is evident in every piece we create.',
    storyText3: 'Today, FORMA continues to push boundaries while honoring our heritage.',
    storyImage: 'default-story-image.png',
    valuesTitle: 'Our Values',
    valuesDescription: 'The principles that guide everything we do.',
    companyValues: [],
    teamTitle: 'Meet Our Team',
    teamDescription: 'The passionate individuals behind every FORMA creation.',
    teamMembers: [],
    statsTitle: 'FORMA by the Numbers',
    companyStatistics: [],
    ctaTitle: 'Experience FORMA',
    ctaDescription: 'Visit our showroom to see our craftsmanship up close.'
  };

  // Content structure following the DTO
  content: AboutContent = {
    coverImage: 'default-cover-image.png',
    heroTitle: 'About FORMA',
    heroSubtitle: 'Crafting Timeless Elegance Since 1987',
    storyTitle: 'Our Story',
    storyContent: 'Born from a passion for exceptional design and uncompromising quality, FORMA has been creating furniture that transcends trends for over three decades.',
    storyText1: 'FORMA began in 1987 in a small workshop in Milan, where master craftsman Giovanni Rossi combined traditional Italian woodworking techniques with contemporary design sensibilities. What started as a family business has evolved into a globally recognized brand synonymous with luxury and sophistication.',
    storyText2: 'Our commitment to excellence is evident in every piece we create. We source only the finest materials from sustainable suppliers and work with skilled artisans who share our dedication to perfection. Each piece of furniture is not just a product, but a work of art that tells a story of craftsmanship and care.',
    storyText3: 'Today, FORMA continues to push boundaries while honoring our heritage, creating furniture that seamlessly blends form and function for the modern home.',
    storyImage: 'default-story-image.png',
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
        id: 1,
        name: 'Sarah Johnson',
        position: 'Founder & CEO',
        bio: 'With over 20 years in furniture design, Sarah leads our vision of creating beautiful, functional spaces.',
        image: 'default-person-one.png',
        displayOrder: 1
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'Head of Design',
        bio: 'Michael brings innovative design concepts to life, blending modern aesthetics with practical functionality.',
        image: 'default-person-two.png',
        displayOrder: 2
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        position: 'Quality Assurance Director',
        bio: 'Emily ensures every piece meets our exacting standards before it reaches your home.',
        image: 'default-person-three.png',
        displayOrder: 3
      },
      {
        id: 4,
        name: 'David Thompson',
        position: 'Customer Experience Manager',
        bio: 'David leads our customer service team, ensuring every interaction exceeds expectations.',
        image: 'default-person-four.png',
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
  ) {
    // Initialize observables
    this.aboutUsData$ = this.store.select(selectaboutusData);
    this.loading$ = this.store.select(selectDataLoading);
    this.error$ = this.store.select(selectDataError);
  }

  ngOnInit(): void {
    // Dispatch action to fetch AboutUs data
    this.store.dispatch(fetchaboutusData());

    // Subscribe to AboutUs data and update content
    this.subscription.add(
      this.aboutUsData$.subscribe(data => {
        if (data) {
          // Create deep copies to avoid read-only issues
          this.content = {
            ...this.defaultContent,
            ...data,
            companyValues: data.companyValues ? data.companyValues.map((value: any) => ({ ...value })) : this.defaultContent.companyValues,
            teamMembers: data.teamMembers ? data.teamMembers.map((member: any) => ({ ...member })) : this.defaultContent.teamMembers,
            companyStatistics: data.companyStatistics ? data.companyStatistics.map((stat: any) => ({ ...stat })) : this.defaultContent.companyStatistics
          };
        } else {
          this.content = this.defaultContent;
        }
      })
    );

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
    this.subscription.unsubscribe();
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
      // Create a new array with updated object to avoid mutating read-only data
      this.content.companyValues = this.content.companyValues.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
    }
  }

  updateTeamMemberContent(index: number, field: string, value: string): void {
    if (this.editingMode && this.isAdmin && this.content.teamMembers[index]) {
      // Create a new array with updated object to avoid mutating read-only data
      this.content.teamMembers = this.content.teamMembers.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
    }
  }

  updateStatContent(index: number, field: string, value: string): void {
    if (this.editingMode && this.isAdmin && this.content.companyStatistics[index]) {
      // Create a new array with updated object to avoid mutating read-only data
      this.content.companyStatistics = this.content.companyStatistics.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
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
          // Create a new array with updated team member image
          this.content.teamMembers = this.content.teamMembers.map((member, i) =>
            i === index ? { ...member, image: imageUrl } : member
          );
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

      // Prepare AboutUs data (without images for content update)
      const aboutUsData = {
        ...this.content
      };

      // Check if this is an update (has ID) or new creation
      if (this.content.id) {
        // Update existing AboutUs data
        console.log(aboutUsData);
        // this.store.dispatch(updateaboutusData({
        //   id: this.content.id,
        //   updatedData: aboutUsData
        // }));

        // Handle image uploads separately if there are any files
        if (this.coverImageFile || this.storyImageFile || Object.keys(this.teamImageFiles).length > 0) {
          const imageFormData = new FormData();
          console.log("updating images here");

          // Add cover image if exists
          if (this.coverImageFile) {
            imageFormData.append('coverImage', this.coverImageFile);
          }

          // Add story image if exists
          if (this.storyImageFile) {
            imageFormData.append('storyImage', this.storyImageFile);
          }

          // Add team member images if exist
          Object.keys(this.teamImageFiles).forEach(index => {
            const teamMemberId = this.content.teamMembers[parseInt(index)]?.id;
            if (teamMemberId && this.teamImageFiles[parseInt(index)]) {
              imageFormData.append(`teamMemberImages[${teamMemberId}]`, this.teamImageFiles[parseInt(index)]);
            }
          });

          // Dispatch image update action
          this.store.dispatch(updateaboutusImages({ id: this.content.id, imageData: imageFormData }));
        }
      }

      // Reset image files after saving
      this.coverImageFile = null;
      this.storyImageFile = null;
      this.teamImageFiles = {};


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

  // Helper methods for image URLs
  getStoryImageUrl(): string {
    // If image starts with 'data:', it's a local preview (base64)
    if (this.content.storyImage && this.content.storyImage.startsWith('data:')) {
      return this.content.storyImage;
    }
    // Otherwise, use backend URL
    return `http://localhost:8080/api/files/${this.content.storyImage}`;
  }

  getCoverImageUrl(): string {
    // If image starts with 'data:', it's a local preview (base64)
    if (this.content.coverImage && this.content.coverImage.startsWith('data:')) {
      return this.content.coverImage;
    }
    // Otherwise, use backend URL
    return `http://localhost:8080/api/files/${this.content.coverImage}`;
  }

  getTeamMemberImageUrl(member: any): string {
    // If image starts with 'data:', it's a local preview (base64)
    if (member.image && member.image.startsWith('data:')) {
      return member.image;
    }
    // Otherwise, use backend URL
    return `http://localhost:8080/api/files/${member.image}`;
  }
}