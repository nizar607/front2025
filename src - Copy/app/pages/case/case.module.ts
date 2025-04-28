import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {CaseRoutingModule} from './case-routing.module';

import {CoursesModule} from './courses/courses.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {CasesComponent} from './cases/cases.component';
import {DetailsComponent} from './details/details.component';
import {CountUpModule} from 'ngx-countup';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SimplebarAngularModule} from 'simplebar-angular';
import {FlatpickrModule} from 'angularx-flatpickr';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {CdkStep, CdkStepLabel, CdkStepperNext, CdkStepperPrevious} from "@angular/cdk/stepper";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgStepperModule} from "angular-ng-stepper";
import {ButtonModule} from "primeng/button";
import {StepperModule} from "primeng/stepper";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {NgxSpinnerModule} from "ngx-spinner";
import { PhasesComponent } from './phases/phases.component';
import { TaskComponent } from './task/task.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    CasesComponent,
    DetailsComponent,
    PhasesComponent,
    TaskComponent
  
  ],
  imports: [
    CommonModule,
    CoursesModule,
    SharedModule,
    CaseRoutingModule,
    CountUpModule,
    PaginationModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    FlatpickrModule.forRoot(),
    TooltipModule,
    CdkStep,
    CdkStepLabel,
    CdkStepperNext,
    CdkStepperPrevious,
    NgSelectModule,
    NgStepperModule,
    ButtonModule,
    StepperModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BsDropdownModule.forRoot(),
    FlatpickrModule.forRoot(),
    AccordionModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    CKEditorModule,
    AccordionModule
  ],
  providers: [DatePipe, DecimalPipe]
})
export class CaseModule {
}
