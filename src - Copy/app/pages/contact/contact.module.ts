import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

// Range Slider
import { NgxSliderModule } from 'ngx-slider-v2';

//Wizard
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleGroupComponent } from './people-group/people-group.component';
import { InstructorsRoutingModule } from '../learning/instructors/instructors-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


@NgModule({
  declarations: [
    PeopleGroupComponent,
    ManageContactComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    DropzoneModule,
    NgStepperModule,
    CdkStepperModule,
    RatingModule,
    NgSelectModule,
    NgxSliderModule,
    FlatpickrModule.forRoot(),
    InstructorsRoutingModule,
    NgApexchartsModule,
  ]
})
export class ContactModule { }
