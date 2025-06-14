import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { PermissionService } from "../services/permission/permission.service";


@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: PermissionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];
    if (this.permissionService.hasPermission(requiredPermission)) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}