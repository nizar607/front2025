import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ListComponent } from './list/list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GridComponent } from './grid/grid.component';


@NgModule({
  declarations: [
    GridComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    SimplebarAngularModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    DropzoneModule,
    ImageCropperComponent
  ]
})
export class CategoryModule { }
