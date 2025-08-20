// Homepage2 Model - Flat interface matching backend structure
export interface Homepage2Model {
  id?: string;
  
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
  
  // Experience Section
  experienceTitle?: string;
  experienceSubtitle?: string;
  
  // Gallery Section
  galleryTitle?: string;
  gallerySubtitle?: string;
  
  // Features Section
  featuresTitle?: string;
  featuresSubtitle?: string;

  // Feature 1
  feature1Number?: string;
  feature1Title?: string;
  feature1Description?: string;
  feature1Link?: string;
  feature1Image?: string;

  // Feature 2
  feature2Number?: string;
  feature2Title?: string;
  feature2Description?: string;
  feature2Link?: string;
  feature2Image?: string;

  // Feature 3
  feature3Number?: string;
  feature3Title?: string;
  feature3Description?: string;
  feature3Link?: string;
  feature3Image?: string;
  
  // Products Section
  productsTitle?: string;
  
  // Why Choose Section
  whyChooseTitle?: string;
  
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
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

// Type alias for consistency with Homepage1
export type Homepage2Data = Homepage2Model;

// Request/Response DTOs
export interface Homepage2CreateRequest extends Omit<Homepage2Model, 'id' | 'createdAt' | 'updatedAt'> {
  companyId: number;
}
