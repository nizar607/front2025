import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalComponent } from 'src/app/global-component';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { NGXLogger } from 'ngx-logger';

const AUTH_API = GlobalComponent.AUTH_API;
const PERMISSIONS_KEY = 'user_permissions';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private permissions: string[] = [];


  constructor(private http:HttpClient, private logger: NGXLogger) {
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
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    console.log("Permission are set ", this.permissions);
  }

  hasPermission(permission: string): boolean {
    console.log("permission to compare", permission,"my permissions ", this.permissions);
    return this.permissions.includes(permission);
  }

  loadPermissionsFromStorage() {
    // First try to get permissions from localStorage
    const storedPermissions = localStorage.getItem(PERMISSIONS_KEY);
    if (storedPermissions) {
      try {
        const parsedPermissions = JSON.parse(storedPermissions);
        this.logger.debug("Permissions loaded from localStorage:", parsedPermissions);
        this.permissions = parsedPermissions;
        return;
      } catch (e) {
        this.logger.error("Error parsing stored permissions:", e);
        localStorage.removeItem(PERMISSIONS_KEY);
      }
    }
    
    // If no permissions in localStorage or parsing failed, fetch from API
    this.fetchPermissionsFromAPI();
  }
  
  fetchPermissionsFromAPI() {
    this.http.get(`${AUTH_API}accesses`).subscribe(
      (permissions: any) => {
        console.log("Permission Service", permissions);
        this.logger.debug("Permissions loaded from API:", permissions);
        this.setPermissions(permissions);
      },
      (error) => {
        this.logger.error("Error loading permissions from API:", error);
      }
    );
  }
}