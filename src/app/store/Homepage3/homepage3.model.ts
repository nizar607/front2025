// Homepage3 Interface Models - Updated to match backend DTO

export interface Homepage3DTO {
  id?: number;
  companyId?: number;
  
  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  heroBackgroundImage?: string;
  heroBadge?: string;
  heroButtonText?: string;
  heroPrimaryButton?: string;
  heroSecondaryButton?: string;
  heroImage?: string;
  
  // Featured Section
  featuredTitle?: string;
  featuredSubtitle?: string;
  
  // Featured Product 1
  featuredProduct1Image?: string;
  featuredProduct1Category?: string;
  featuredProduct1Name?: string;
  featuredProduct1Description?: string;
  featuredProduct1Price?: string;
  
  // Featured Product 2
  featuredProduct2Image?: string;
  featuredProduct2Category?: string;
  featuredProduct2Name?: string;
  featuredProduct2Description?: string;
  featuredProduct2Price?: string;
  
  // Featured Product 3
  featuredProduct3Image?: string;
  featuredProduct3Category?: string;
  featuredProduct3Name?: string;
  featuredProduct3Description?: string;
  featuredProduct3Price?: string;
  
  // Categories Section
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  
  // Category Item 1
  categoryItem1Image?: string;
  categoryItem1Name?: string;
  categoryItem1Count?: string;
  
  // Category Item 2
  categoryItem2Image?: string;
  categoryItem2Name?: string;
  categoryItem2Count?: string;
  
  // Category Item 3
  categoryItem3Image?: string;
  categoryItem3Name?: string;
  categoryItem3Count?: string;
  
  // Artisan Section
  artisanTitle?: string;
  artisanDescription?: string;
  artisanLink?: string;
  artisanImage?: string;
  
  // Newsletter Section
  newsletterTitle?: string;
  newsletterText?: string;
  
  // Dining Info Section
  diningInfoTitle?: string;
  diningInfoDescription?: string;
  diningInfoButton?: string;
  diningInfoImage?: string;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

// Request/Response interfaces
export interface Homepage3CreateRequest {
  homepage3: Homepage3DTO;
}

export interface Homepage3UpdateRequest {
  id: number;
  homepage3: Partial<Homepage3DTO>;
}

export interface Homepage3Response {
  success: boolean;
  message: string;
  data: Homepage3DTO;
}

export interface Homepage3ListResponse {
  success: boolean;
  message: string;
  data: Homepage3DTO[];
  total: number;
  page: number;
  limit: number;
}

// Image upload interfaces
export interface ImageUploadRequest {
  file: File;
  section: string;
  field: string;
}

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  imageUrl: string;
}

// Error response interface
export interface Homepage3ErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

// State interface for NgRx
export interface Homepage3State {
  homepage3Data: Homepage3DTO | null;
  loading: boolean;
  error: string | null;
  imageUploading: boolean;
  imageUploadError: string | null;
}

// Initial state
export const initialHomepage3State: Homepage3State = {
  homepage3Data: null,
  loading: false,
  error: null,
  imageUploading: false,
  imageUploadError: null
};