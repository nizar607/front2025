import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice/invoice.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

// Overview Component
export class OverviewComponent {

  invoiceId!: string;
  invoiceData: any;

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) { } 

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Invoice', active: true },
      { label: 'Invoice Overview', active: true }
    ];

    this.invoiceId = this.route.snapshot.paramMap.get('invoiceId')!;

    this.invoiceService.getSelectedInvoice(this.invoiceId).subscribe((data) => {
      console.log('data', data)
      this.invoiceData = data;
    }
    )

    console.log('this.invoiceId', this.invoiceId)
  }

}
