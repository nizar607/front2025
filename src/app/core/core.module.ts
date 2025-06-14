import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './directives/permission/has-permission.directive';

@NgModule({
  declarations: [
    HasPermissionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HasPermissionDirective
  ]
})
export class CoreModule { }