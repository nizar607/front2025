import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSetupComponent } from './profile-setup.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileSetupComponent
  }
];

@NgModule({
  declarations: [
    ProfileSetupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    DropzoneModule,
    ImageCropperComponent,
    CoreModule
  ]
})
export class ProfileSetupModule { }