export interface User {
  id?: number;
  // Add other user properties as needed
}

export interface InvoiceItem {
  id?: number;
  invoice?: Invoice;
  
  // Article/Product Information
  articleId: number;
  productName: string;
  productDescription?: string;
  productCategory?: string;
  productImageUrl?: string;
  
  // Pricing and Quantity
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  
  // Tax Information
  taxRate: number;
  taxAmount: number;
  
  // Timestamps
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export interface Invoice {
  id?: number;
  invoiceNumber: string;
  status: InvoiceStatus;
  user?: User;
  
  // Company Information
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
  
  // Financial Details
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  taxRate: number;
  
  // Timestamps
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  
  // Invoice Items
  invoiceItems: InvoiceItem[];
  
  // Additional fields
  footerText?: string;
}

// Helper interface for creating new invoices
export interface CreateInvoiceRequest {
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount?: number;
  currency?: string;
  taxRate?: number;
  invoiceItems?: Omit<InvoiceItem, 'id' | 'invoice'>[];
  footerText?: string;
}

// Helper interface for updating invoices
export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  id: number;
  status?: InvoiceStatus;
}