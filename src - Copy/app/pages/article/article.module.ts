import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { ArticleRoutingModule } from './article-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ListComponent } from '../stock/list/list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    GridComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
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
export class ArticleModule { }
