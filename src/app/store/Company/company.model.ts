export interface CompanyModel {
  id: number;
  companyId: number;
  heroTitle: string;
  heroSubtitle: string;
  coverImage: string;
  storyTitle: string;
  storyContent: string;
  storyText1: string;
  storyText2: string;
  storyText3: string;
  storyImage: string;
  valuesTitle: string;
  valuesDescription: string;
  companyValues: CompanyValueModel[];
  teamTitle: string;
  teamDescription: string;
  teamMembers: TeamMemberModel[];
  statsTitle: string;
  companyStatistics: CompanyStatisticModel[];
  ctaTitle: string;
  ctaDescription: string;
}

export interface CompanyValueModel {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
}

export interface TeamMemberModel {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  displayOrder: number;
}

export interface CompanyStatisticModel {
  id: number;
  label: string;
  value: string;
  displayOrder: number;
}