import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalComponent } from 'src/app/global-component';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { NGXLogger } from 'ngx-logger';

const AUTH_API = GlobalComponent.AUTH_API;
const USER_KEY = 'currentUser';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private connectedUser: any;
  private permissions: string[] = [];


  constructor(private http: HttpClient, private logger: NGXLogger) {
    // First try to load permissions from localStorage
    this.loadPermissionsFromStorage();
  }


  setPermissions(permissions: string[]) {
    if (!permissions || !Array.isArray(permissions)) {
      this.logger.warn("Invalid permissions format", permissions);
      return;
    }

    this.permissions = permissions;
    // Store permissions in localStorage for persistence
    console.log("Permission are set ", this.permissions);
  }

  hasPermission(permission: string): boolean {
    console.log("permission to compare", permission, "my permissions ", this.permissions);
    return this.permissions.includes(permission);
  }

  loadPermissionsFromStorage() {
    // First try to get permissions from localStorage
    const connectedUser = localStorage.getItem(USER_KEY);
    if (connectedUser) {
      try {
        const parsedConnectedUser = JSON.parse(connectedUser);
        this.logger.debug("Permissions loaded from localStorage:", parsedConnectedUser.accesses);
        this.permissions = parsedConnectedUser.accesses;
        return;
      } catch (e) {
        this.logger.error("Error parsing stored permissions:", e);
      }
    } 

  }

  // fetchPermissionsFromAPI() {
  //   this.http.get(`${AUTH_API}accesses`).subscribe(
  //     (permissions: any) => {
  //       console.log("Permission Service", permissions);
  //       this.logger.debug("Permissions loaded from API:", permissions);
  //       this.setPermissions(permissions);
  //     },
  //     (error) => {
  //       this.logger.error("Error loading permissions from API:", error);
  //     }
  //   );
  // }
}