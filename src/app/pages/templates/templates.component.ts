import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  connectedUser: any;
  isAdmin: boolean = false;
  editingMode: boolean = false;
  editingTemplate: string | null = null;
  editingField: string | null = null;

  // Template data structure with proper typing
  templates: { [key: string]: {
    name: string;
    description: string;
    previewTitle: string;
    previewDescription: string;
    features: string[];
    image: string;
  } } = {
    v3: {
      name: 'VibePulse',
      description: 'A rich and interactive design with dynamic layouts, engaging animations, and comprehensive content sections for maximum user engagement.',
      previewTitle: 'Rich & Interactive',
      previewDescription: 'Dynamic layouts with engaging elements',
      features: ['Interactive', 'Dynamic', 'Comprehensive'],
      image: 'assets/images/templates/v3.png'
    },
    v1: {
      name: 'CleanEdge',
      description: 'A minimalist and bold design emphasizing white space, striking typography, and focused content presentation for contemporary furniture showcases.',
      previewTitle: 'Minimalist & Bold',
      previewDescription: 'Clean aesthetics with powerful impact',
      features: ['Minimalist', 'Bold', 'Contemporary'],
      image: 'assets/images/templates/v2.png'
    },
    v2: {
      name: 'LuxeSerif',
      description: 'A modern and elegant design featuring clean layouts, sophisticated typography, and premium aesthetics perfect for luxury furniture brands.',
      previewTitle: 'Modern & Elegant',
      previewDescription: 'Clean design with sophisticated layouts',
      features: ['Modern', 'Elegant', 'Premium'],
      image: 'assets/images/templates/v1.png'
    },
    custom: {
      name: 'Custom Template',
      description: 'Design your own unique template with our intuitive builder. Choose colors, layouts, and components that perfectly match your brand identity.',
      previewTitle: 'Build Your Own',
      previewDescription: 'Create a unique design tailored to your needs',
      features: ['Customizable', 'Unique', 'Flexible'],
      image: 'assets/images/templates/custom.png'
    }
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is admin
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.connectedUser = JSON.parse(currentUser);
      this.isAdmin = this.connectedUser?.roles?.[0] === 'ROLE_ADMIN';
    }
  }

  selectTemplate(version: string): void {
    // Store the selected template preference
    localStorage.setItem('selectedTemplate', version);
    localStorage.setItem('hasHomepage', 'true');
    
    // Navigate to the selected homepage template
    if (version === 'v1') {
      this.router.navigate(['/client']);
    } else if (version === 'v2') {
      this.router.navigate(['/client/v2']);
    } else if (version === 'v3') {
      this.router.navigate(['/client/v3']);
    } else if (version === 'custom') {
      // Navigate to custom template builder or custom template page
      this.router.navigate(['/client/custom']);
    }
  }

  skipTemplateSelection(): void {
    // Skip template selection and go directly to analytics
    localStorage.setItem('hasHomepage', 'true');
    localStorage.setItem('selectedTemplate', 'none');
    
    // Navigate to analytics dashboard
    this.router.navigate(['/analytics']);
  }

  // Admin editing methods
  toggleEditMode(): void {
    if (this.isAdmin) {
      this.editingMode = !this.editingMode;
      this.editingTemplate = null;
      this.editingField = null;
    }
  }

  startEditing(template: string, field: string): void {
    if (this.isAdmin && this.editingMode) {
      this.editingTemplate = template;
      this.editingField = field;
    }
  }

  saveEdit(template: string, field: string, event: any): void {
    if (this.isAdmin && this.editingMode && this.editingTemplate === template && this.editingField === field) {
      const value = event.target.innerText.trim();
      if (value && this.templates[template]) {
        // Update the template data with proper type assertion
        (this.templates[template] as any)[field] = value;
        
        // In a real application, you would save this to a database
        // For now, we'll just update the local state
        console.log(`Updated ${field} for ${template} to: ${value}`);
      }
      
      // Exit editing mode for this field
      this.editingTemplate = null;
      this.editingField = null;
    }
  }

  cancelEdit(): void {
    this.editingTemplate = null;
    this.editingField = null;
  }

  updateImage(template: string, event: any): void {
    if (this.isAdmin && this.editingMode) {
      const file = event.target.files[0];
      if (file) {
        // In a real application, you would upload this file to a server
        // For now, we'll just create a local URL
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.templates[template].image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Helper method to get template data
  getTemplate(version: string): any {
    return this.templates[version] || {};
  }
}