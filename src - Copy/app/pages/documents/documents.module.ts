import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FileManagerComponent} from "./file-manager/file-manager.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimplebarAngularModule} from "simplebar-angular";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CountUpModule} from "ngx-countup";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {NgApexchartsModule} from "ng-apexcharts";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {TabsModule} from "ngx-bootstrap/tabs";
import {SharedModule} from "../../shared/shared.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {NgxEchartsModule} from "ngx-echarts";
import * as echarts from "echarts";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from "ngx-dropzone-wrapper";
import {DocumentsRoutingModule} from "./documents-routing.module";


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    FileManagerComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    CountUpModule,
    ProgressbarModule,
    NgApexchartsModule,
    PickerModule,
    TabsModule.forRoot(),
    SharedModule,
    LeafletModule,
    PaginationModule.forRoot(),
    NgxEchartsModule.forRoot({echarts}),
    CKEditorModule,
    DropzoneModule,
  ],
  providers: [
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
})
export class DocumentsModule {
}
