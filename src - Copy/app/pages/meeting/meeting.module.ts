import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeetingRoutingModule} from "./meeting-routing.module";
import {CalendarComponent} from "./calendar/calendar.component";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FlatpickrModule} from "angularx-flatpickr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FullCalendarModule} from "@fullcalendar/angular";
import {ModalModule} from "ngx-bootstrap/modal";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {SimplebarAngularModule} from "simplebar-angular";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CountUpModule} from "ngx-countup";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {TabsModule} from "ngx-bootstrap/tabs";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {AppsRoutingModule} from "../apps/apps-routing.module";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {NgxEchartsModule} from "ngx-echarts";
import * as echarts from "echarts";
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";



@NgModule({
  declarations: [
    CalendarComponent
  ],
    imports: [
      CommonModule,
      MeetingRoutingModule,
      FullCalendarModule,
      ModalModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      TimepickerModule.forRoot(),
      SimplebarAngularModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      CountUpModule,
      PickerModule,
      TabsModule.forRoot(),
      LeafletModule,
      PaginationModule.forRoot(),
      CKEditorModule,
      FlatpickrModule.forRoot(),
    ]
})
export class MeetingModule { }
