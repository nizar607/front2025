// Homepage1 Model - Matches the flat structure of the Java entity
export interface Homepage1Model {
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
  
  // Category Items (both naming conventions for compatibility)
  categoryItem1Image?: string;
  categoryItem1Name?: string;
  categoryItem1Count?: string;
  category1Image?: string;
  category1Name?: string;
  category1Count?: string;
  
  categoryItem2Image?: string;
  categoryItem2Name?: string;
  categoryItem2Count?: string;
  category2Image?: string;
  category2Name?: string;
  category2Count?: string;
  
  categoryItem3Image?: string;
  categoryItem3Name?: string;
  categoryItem3Count?: string;
  category3Image?: string;
  category3Name?: string;
  category3Count?: string;
  
  // Category Item 4
  categoryItem4Image?: string;
  categoryItem4Name?: string;
  categoryItem4Count?: string;
  category4Image?: string;
  category4Name?: string;
  category4Count?: string;
  
  // Experience Section
  experienceTitle?: string;
  experienceSubtitle?: string;
  
  // Gallery Section
  galleryTitle?: string;
  gallerySubtitle?: string;
  
  // Features Section
  featuresTitle?: string;
  featuresSubtitle?: string;
  
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
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}