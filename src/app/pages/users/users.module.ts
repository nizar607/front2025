import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Count To
import { CountUpModule } from 'ngx-countup';

// Bootstrap Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Component
import { ListComponent } from './list/list.component';
import { InvoicesRoutingModule } from '../invoices/invoices-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CountUpModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule
  ]
})
export class UsersModule { }