import { DecimalPipe } from '@angular/common';
import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { selectData, selectlistData } from 'src/app/store/Invoices/invoices.selector';
import { deleteinvoice, fetchInvoiceData, fetchInvoicelistData } from 'src/app/store/Invoices/invoices.action';
import { InvoiceService } from 'src/app/core/services/invoice/invoice.service';
import { CaseService } from 'src/app/core/services/case/case.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DecimalPipe]
})

// List Component
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  invoiceslist: any
  invoices: any;
  deleteID: any;
  masterSelected!: boolean;
  invoiceCard: any;
  term: any
  cases : any[] = [];
  selectedCase: any;
  invoicesData : any;
  totalInvoiceAmount: any;

  

  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('addInvoiceModal', {static: false}) addInvoiceModal?: ModalDirective;

  constructor(public store: Store, private invoiceService: InvoiceService, private caseService: CaseService, private router: Router) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoice', active: true },
      { label: 'Invoice List', active: true }
    ];
    // store

    // Fetch Data
    setTimeout(() => {

      // this.store.dispatch(fetchInvoicelistData());
      // this.store.select(selectlistData).subscribe((data) => {
      //   this.invoices = data;
      //   this.invoiceslist = data;
      //   this.invoices = this.invoiceslist.slice(0, 10)
      // });

      this.invoiceService.fetchData().subscribe((data) => {
        this.invoices = data;
        this.invoiceslist = data;
        this.invoices = this.invoiceslist.slice(0, 10)

        console.log('this.invoices', this.invoices)

        this.totalInvoiceAmount = this.invoices.reduce((acc: any, obj: any) => acc + obj.totalAmount, 0);
        console.log('totalInvoiceAmount : ', this.totalInvoiceAmount)
      }
      )

      this.invoiceService.getAlldata().subscribe((data) => {
        console.log('getAlldata : ', data)
        this.invoicesData = data;
      })

      this.caseService.fetchData().subscribe((data) => {
        this.cases = data;
        console.log('this.cases', this.cases)
      }
      )

      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    // this.store.dispatch(fetchInvoiceData());
    // this.store.select(selectData).subscribe((data) => {
    //   this.invoiceCard = data;
    // });
  }

  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.invoices]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.invoices = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.invoices = this.invoiceslist.filter((el: any) => el.customer.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.invoices = this.invoiceslist
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;

    if (this.term && this.invoices.length === 0) {
      noResultElement.style.display = 'block';
    } else {
      noResultElement.style.display = 'none';
    }
  }


  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.invoices = this.invoices.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));

    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].states == true) {
        result = this.invoices[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].states == true) {
        result = this.invoices[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  deleteData(id: any) {
   
    this.invoiceService.deleteData(id).subscribe((data) => {
      this.invoices = this.invoices.filter((x: { id: any; }) => x.id !== id)
    }
    )
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  // Page Changed
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.invoices = this.invoiceslist
      .slice(startItem, endItem);
  }

  confirmCase(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteinvoice({ id: this.deleteID.toString() }));
    }
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  submit() {
    this.addInvoiceModal?.hide();
  }

  onChange(event: any) {
    this.selectedCase = event;
    console.log('event', this.selectedCase.id);
  }

  addInvoice() {
    if (this.selectedCase) {
      this.router.navigate(['/invoices/create/'+this.selectedCase.id]);
    }
    else {
      this.addInvoiceModal?.show();
    }
  }

}
