import { Directive } from '@angular/core';
import { Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../services/permission/permission.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  
  @Input() set appHasPermission(permission: string) {
    this.viewContainer.clear();
    
    if (this.permissionService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}
}
