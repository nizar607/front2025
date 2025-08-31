import { Component, ViewChild } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addinvoiceData } from 'src/app/store/Invoice/invoice.action';
import { CaseService } from 'src/app/core/services/case/case.service';
import { fetcharticleData } from 'src/app/store/Article/article.action';
import { selectarticleData } from 'src/app/store/Article/article-selector';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

// Create Component
export class CreateComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  invoices: any;
  submitted = false;
  InvoicesForm!: UntypedFormGroup;
  paymentSign = "$";
  subtotalamount = 0;
  taxRate = 0.18;

  invoiceTotal!: number;

  userForm!: UntypedFormGroup;
  forms: any = [];
  caseId!: string;
  case: any;

  articles: any[] = [];

  // Modal for adding item via article selection
  @ViewChild('addItemModal') addItemModal!: ModalDirective;
  selectedArticle: any | null = null;
  selectedItemForm: UntypedFormGroup | null = null;

  constructor(private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, public router: Router, public store: Store, private activatedRoute: ActivatedRoute,
    private caseService: CaseService
  ) {

  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoice', active: true },
      { label: 'Create Invoice', active: true }
    ];


    this.store.dispatch(fetcharticleData());
    this.store.select(selectarticleData).subscribe((data) => {
      this.articles = data;
    })

    this.activatedRoute.params.subscribe(params => { this.caseId = params['caseId']; });
    this.caseService.fetchSelectedData(this.caseId).subscribe((data) => {
      this.case = data;
      console.log('caseList : ', this.case);
    });

    this.InvoicesForm = this.formBuilder.group({

      // invoice fields
      invoiceNumber: [this.generateInvoiceNumber(), [Validators.required]],
      status: ['Paid', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      subtotalAmount: ['', [Validators.required]],
      taxAmount: ['', [Validators.required]],
      currency: ['USD', [Validators.required]],
      taxRate: ['0.18', [Validators.required]],
      createdAt: [new Date(), [Validators.required]],

      //  company fields
      companyAddress: ['ariana, rue du maroc', [Validators.required]],
      companyEmail: ['companylaywer@gmail.com', [Validators.required]],
      companyName: ['company', [Validators.required]],
      companyPhone: ['203040598', [Validators.required]],
      companyWebsite: ['www.company.com', [Validators.required]],
      footerText: ['Thank you for entrusting us with your legal needs. It has been our privilege to assist you, and we look forward to serving you again in the future.', [Validators.required]],

      // user fields
      userFirstName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
      userPhone: ['', [Validators.required]],
      userAddress: ['', [Validators.required]],


      invoiceItems: this.formBuilder.array([]),

    });

  }
  // File Upload
  imageURL: string | undefined;
  fileChange(event: any, id: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      if (id == '0') {
        (document.getElementById('product-img') as HTMLImageElement).src = this.imageURL;
      } else {
        (document.getElementById('logo-img') as HTMLImageElement).src = this.imageURL;
      }
    }
    reader.readAsDataURL(file)
  }

  /**
* Form data get
*/
  get form() {
    return this.InvoicesForm.controls;
  }

  // Add Item - open popup to select an article
  addItem(): void {
    this.selectedArticle = null;
    this.selectedItemForm = null;
    if (this.addItemModal) {
      this.addItemModal.show();
    }
  }

  // When an article card is clicked in the popup
  onSelectArticle(article: any): void {
    this.selectedArticle = article;

    this.selectedItemForm = this.formBuilder.group({
      id: [article?.id, Validators.required],
      name: [article?.name || '', Validators.required],
      description: [article?.description || ''],
      price: [article?.price || 0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      amount: [0],
    });
  }

  // Confirm adding selected article as an invoice item
  confirmAddItem(): void {
    if (!this.selectedItemForm) return;
    const id = this.selectedItemForm.get('id')?.value;
    const name = this.selectedItemForm.get('name')?.value;
    const description = this.selectedItemForm.get('description')?.value;
    const price = Number(this.selectedItemForm.get('price')?.value || 0);
    const quantity = Number(this.selectedItemForm.get('quantity')?.value || 1);

    const total = price * quantity;
    // console.log("price ", price);
    // console.log("total ", total);
    // console.log("quantity ", quantity);


    const itemForm = this.formBuilder.group({
      id: [id],
      name: [name],
      description: [description],
      price: [price],
      quantity: [quantity],
      amount: [total]
    });


    let subTotal = (this.items.controls as FormGroup[]).reduce((acc: number, item: FormGroup) => {
      return acc + Number(item.get('amount')?.value);
    }, 0);
    subTotal += total;

    console.log("subTotal ", subTotal);

    const taxAmount = subTotal * this.taxRate;
    console.log("taxAmount ", taxAmount);

    this.InvoicesForm.controls['subtotalAmount'].setValue(subTotal);
    this.InvoicesForm.controls['taxAmount'].setValue(taxAmount);
    this.InvoicesForm.controls['totalAmount'].setValue(subTotal + taxAmount);


    this.items.push(itemForm);

    // reset and close
    this.selectedItemForm = null;
    this.selectedArticle = null;
    if (this.addItemModal) {
      this.addItemModal.hide();
    }
  }

  get items() {
    return this.InvoicesForm.get('invoiceItems') as FormArray;
  }

  getSubItems(itemIndex: number) {
    return (this.items.at(itemIndex) as FormGroup).get('invoiceItems') as FormArray;
  }


  // Remove Item
  removeItem(index: any) {
    // Remove the item from the form array
    this.items.removeAt(index);
    
    // Recalculate all totals based on remaining items
    const totalAmount = this.items.value.reduce((acc: number, item: any) => {
      return acc + parseFloat(item.amount || 0);
    }, 0);

    const taxAmount = totalAmount * this.taxRate;
    const finalTotal = totalAmount + taxAmount;

    // Update form controls with recalculated values
    this.InvoicesForm.controls['subtotalAmount'].setValue(totalAmount);
    this.InvoicesForm.controls['taxAmount'].setValue(taxAmount);
    this.InvoicesForm.controls['totalAmount'].setValue(finalTotal);
  }

  otherPayment(ev: any) {
    this.paymentSign = ev.target.value
  }

  // Default
  counter: any = 0;
  price: any = 0;
  calculateQty(index: number, id: any) {
    const serviceItem = this.items.at(index) as FormGroup;
    let currentQuantity = serviceItem.get('quantity')?.value || 1;

    if (id == '0') {
      // Decrease quantity
      if (currentQuantity > 1) {
        currentQuantity--;
      }
    } else {
      // Increase quantity
      currentQuantity++;
    }

    // Update the form control
    serviceItem.get('quantity')?.setValue(currentQuantity);
    
    // Recalculate amount for this item
    const price = serviceItem.get('price')?.value || 0;
    const amount = price * currentQuantity;
    serviceItem.get('amount')?.setValue(amount);

    // Recalculate totals
    this.calculateAmount(index);
  }

  calculateAmount(index: number): void {
    const serviceItem: FormGroup = this.items.at(index) as FormGroup;
    const price = serviceItem.get('price')?.value || 0;
    const quantity = serviceItem.get('quantity')?.value || 1;
    const amount = price * quantity;
    serviceItem.get('amount')?.setValue(amount);

    const totalAmount = this.items.value.reduce((acc: number, item: any) => {
      return acc + parseFloat(item.amount)
    }, 0)

    this.InvoicesForm.controls['subtotalAmount'].setValue(totalAmount);
    this.InvoicesForm.controls['taxAmount'].setValue(totalAmount * 0.18);

    this.InvoicesForm.controls['totalAmount'].setValue(totalAmount * 1.18);

  }

  /* Save user */
  saveInvoice() {

    console.log("InvoicesForm.value ", this.InvoicesForm.value);
    if (this.InvoicesForm.valid) {
      this.store.dispatch(addinvoiceData({ newData: this.InvoicesForm.value }));
    }
    this.submitted = true

    this.router.navigate(['/invoices/list']);
  }


  generateInvoiceNumber(): string {
    const prefix = '#TBS'; // Prefix for the invoice number
    const date = new Date();
    const randomDigits = Math.floor(Math.random() * 100000000); // Generates a random number between 0 and 99999999

    // Format the random number to be 8 digits long, padded with leading zeros
    const formattedRandomDigits = String(randomDigits).padStart(8, '0');

    // Combine prefix with formatted random digits and the current year
    return `${prefix}${date.getFullYear().toString().slice(-2)}${formattedRandomDigits}`;
  }
}