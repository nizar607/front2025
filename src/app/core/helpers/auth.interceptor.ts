import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../../core/services/token-storage.service';
import { Observable } from 'rxjs';
import { NGXLogger } from "ngx-logger";
import { PermissionService } from '../services/permission/permission.service';
import { GlobalComponent } from 'src/app/global-component';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenStorageService,
    private logger: NGXLogger,
    private permissionService: PermissionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    
    // Check if we need to refresh permissions
    // Skip permission check for the accesses endpoint to avoid infinite loop
    if (token != null && !req.url.includes(`${GlobalComponent.AUTH_API}accesses`)) {
      // Ensure permissions are loaded if we have a token
      this.ensurePermissionsLoaded();
    }
    
    if (token != null) {
      // for Spring Boot back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    
    return next.handle(authReq);
  }
  
  private ensurePermissionsLoaded(): void {
    // Check if permissions are already loaded from localStorage
    const storedPermissions = localStorage.getItem('user_permissions');
    if (!storedPermissions) {
      // If no permissions in localStorage, fetch from API
      this.logger.debug('No permissions found in localStorage, fetching from API');
      this.permissionService.fetchPermissionsFromAPI();
    }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
