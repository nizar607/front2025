import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from'simplebar-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';





@NgModule({
  declarations: [
    // ListComponent
  ],
  imports: [
    StockRoutingModule,
    CommonModule,
    SharedModule,
    BsDropdownModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    ModalModule.forRoot(),
  ]
})
export class StockModule { }
