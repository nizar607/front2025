// Homepage Model - Comprehensive interface for homepage content management
export interface HomepageModel {
  id?: string;
  
  // Hero Section (common across all components)
  hero?: {
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
    backgroundImage?: string;
    badge?: string; // from v4
    buttonText?: string; // from v4
    primaryButton?: string; // from v4
    secondaryButton?: string; // from v4
    image?: string; // from v4
  };
  
  // Featured Section (from homepage v1)
  featured?: {
    title?: string;
    subtitle?: string;
    products?: FeaturedProductModel[];
  };
  
  // Categories Section (from homepage v1)
  categories?: {
    title?: string;
    subtitle?: string;
    items?: CategoryItemModel[];
  };
  
  // Experience Section (from homepage v2)
  experience?: {
    title?: string;
    subtitle?: string;
    cards?: ExperienceCardModel[];
  };
  
  // Gallery Section (from homepage v2)
  gallery?: {
    title?: string;
    subtitle?: string;
    products?: GalleryProductModel[];
    artisan?: ArtisanModel;
    dining?: DiningModel;
  };
  
  // Features Section (from homepage v4)
  features?: {
    title?: string;
    subtitle?: string;
    items?: FeatureItemModel[];
  };
  
  // Products Section (from homepage v4)
  products?: {
    title?: string;
    items?: ProductItemModel[];
  };
  
  // Stats Section (from homepage v2)
  stats?: {
    items?: StatisticModel[];
  };
  
  // Why Choose Section (from homepage v2)
  whyChoose?: {
    title?: string;
    features?: string[];
  };
  
  // Artisan Section (from homepage v2)
  artisan?: ArtisanModel;
  
  // Newsletter Section (common across all components)
  newsletter?: {
    title?: string;
    text?: string;
  };
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

// Nested Interface Models based on actual component usage

// Featured Products (from homepage v1)
export interface FeaturedProductModel {
  image?: string;
  category?: string;
  name?: string;
  description?: string;
  price?: string;
}

// Category Items (from homepage v1)
export interface CategoryItemModel {
  image?: string;
  name?: string;
  count?: string;
}

// Experience Cards (from homepage v2)
export interface ExperienceCardModel {
  title?: string;
  description?: string;
  link?: string;
  image?: string;
}

// Gallery Products (from homepage v2)
export interface GalleryProductModel {
  image?: string;
  name?: string;
  price?: string;
  button?: string;
}

// Artisan Model (from homepage v2)
export interface ArtisanModel {
  title?: string;
  description?: string;
  link?: string;
  image?: string;
}

// Dining Model (from homepage v2)
export interface DiningModel {
  title?: string;
  description?: string;
  button?: string;
  image?: string;
}

// Feature Items (from homepage v4)
export interface FeatureItemModel {
  title?: string;
  description?: string;
  link?: string;
}

// Product Items (from homepage v4)
export interface ProductItemModel {
  image?: string;
  badge?: string;
  category?: string;
  name?: string;
  price?: string;
  buttonText?: string;
}

// Statistics (from homepage v2)
export interface StatisticModel {
  number?: string;
  label?: string;
}

// Request/Response DTOs
export interface HomepageCreateRequest {
  companyId: number;
  heroTitle?: string;
  heroSubtitle?: string;
  // ... other fields as needed
}

export interface HomepageUpdateRequest {
  id: number;
  heroTitle?: string;
  heroSubtitle?: string;
  // ... other fields as needed
}

export interface HomepageResponse {
  success: boolean;
  data: HomepageModel;
  message?: string;
}

export interface HomepageListResponse {
  success: boolean;
  data: HomepageModel[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}