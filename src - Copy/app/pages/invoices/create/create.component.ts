import { Component } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addInvoiceData } from 'src/app/store/Invoices/invoices.action';
import { CaseService } from 'src/app/core/services/case/case.service';

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
  subtotal = 0;
  taxRate = 0.18;

  invoiceTotal!: number;

  userForm!: UntypedFormGroup;
  forms: any = [];
  caseId!: string;
  case: any;

  constructor(private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, public router: Router, public store: Store, private activatedRoute: ActivatedRoute,
    private caseService: CaseService
  ) {

    this.userForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: [0],
      price: []
    })

    this.forms.push(this.userForm.value)



  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoice', active: true },
      { label: 'Create Invoice', active: true }
    ];

    this.activatedRoute.params.subscribe(params => { this.caseId = params['caseId']; });
    this.caseService.fetchSelectedData(this.caseId).subscribe((data) => {
      this.case = data;
      console.log('caseList : ', this.case);
    });

    this.InvoicesForm = this.formBuilder.group({

      companyAddress: ['ariana, rue du maroc', [Validators.required]],
      companyEmail: ['laywer@gmail.com', [Validators.required]],
      companyPhoneNumber: ['203040598', [Validators.required]],
      invoiceNumber: [this.generateInvoiceNumber(), [Validators.required]],
      status: ['Paid', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      invoiceServices: this.formBuilder.array([]),
      concernedCase: [this.caseId, [Validators.required]],
      subtotal: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      // form array
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

  // Add Item
  addItem(): void {

    const serviceForm = this.formBuilder.group({
      activity: '',
      description: '',
      rate: 0,
      amount: 0,
      hours: 0
    })

    this.services.push(serviceForm);
  }

  get services() {
    return this.InvoicesForm.get('invoiceServices') as FormArray;
  }

  getSubItems(itemIndex: number) {
    return (this.services.at(itemIndex) as FormGroup).get('invoiceServices') as FormArray;
  }


  // Remove Item
  removeItem(index: any) {
    this.forms.splice(index, 1);
  }

  otherPayment(ev: any) {
    this.paymentSign = ev.target.value
  }

  // Default
  counter: any = 0;
  price: any = 0;
  calculateQty(index: number, id: any) {
    const serviceItem = this.services.at(index) as FormGroup;
    serviceItem.controls['amount'].setValue(serviceItem.get('rate')?.value * serviceItem.get('hours')?.value);
    console.log("form ", serviceItem.value);

    if (id == 0) {
      this.counter = (document.getElementById('product-hours-' + index) as HTMLInputElement).value;
      if (this.counter > 0) {
        this.counter--;
      }
    } else {
      this.counter = (document.getElementById('product-hours-' + index) as HTMLInputElement).value;
      this.counter++;
    }

    (document.getElementById('product-hours-' + index) as HTMLInputElement).value = this.counter;

    const rate = this.InvoicesForm.get('rate')?.value;
    (document.getElementById('productAmount-' + index) as HTMLInputElement).value = (this.counter * rate).toFixed(2);
    const price = document.querySelectorAll('.invoice-product-line-price')
    price.forEach((item: any) => {
      this.price += parseFloat((item as HTMLInputElement).value)
    })

    this.InvoicesForm.controls['subtotal'].setValue(this.price);

    const subtotal = this.InvoicesForm.get('subtotal')?.value
    var tax = parseFloat((subtotal * this.taxRate).toFixed(2));
    var total = subtotal + tax;

    this.InvoicesForm.controls['tax'].setValue(tax);
    this.InvoicesForm.controls['totalAmount'].setValue(total);
    this.invoiceTotal = total;
  }

  calculateAmount(index: number): void {
    const serviceItem: FormGroup = this.services.at(index) as FormGroup;
    const rate = serviceItem.get('rate')?.value || 0;
    const hours = serviceItem.get('hours')?.value || 0;
    const amount = rate * hours;
    serviceItem.get('amount')?.setValue(amount);

    const totalAmount = this.services.value.reduce((acc: number, item: any) => {
      return acc + parseFloat(item.amount)
    }, 0)

    this.InvoicesForm.controls['subtotal'].setValue(totalAmount);
    this.InvoicesForm.controls['tax'].setValue(totalAmount * 0.18);

    this.InvoicesForm.controls['totalAmount'].setValue(totalAmount * 1.18);

  }

  /* Save user */
  saveInvoice() {

    console.log("InvoicesForm.value ", this.InvoicesForm.value);
    if (this.InvoicesForm.valid) {
      this.store.dispatch(addInvoiceData({ newData: this.InvoicesForm.value }));
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