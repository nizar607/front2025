import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { PermissionService } from '../../core/services/permission/permission.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, Register, RegisterSuccess, RegisterFailure, fetchUser, fetchUserSuccess, fetchUserFailure } from './authentication.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      exhaustMap(({ email, firstName, lastName, password, roles }) =>
        this.AuthenticationService.register(email, firstName, lastName, password, roles).pipe(
          map((user) => {
            this.router.navigate(['/auth/login']);
            return RegisterSuccess({ user });
          }),
          catchError((error) => {
            console.error('An error occurred:', error);
            return of(RegisterFailure({ error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.AuthenticationService.login(email, password).pipe(
          map((user) => {
            if (user.status == 'success') {
              localStorage.setItem('currentUser', JSON.stringify(user.data));
              localStorage.setItem('token', user.token);
              // Refresh permissions after successful login
              this.permissionService.loadPermissionsFromStorage();
              
              // Check localStorage values for redirection logic
              const hasProfile = localStorage.getItem('hasProfile') === 'true';
              const hasHomepage = localStorage.getItem('hasHomepage') === 'true';
              
              if (!hasProfile) {
                // Profile not completed, start with profile setup
                this.router.navigate(['/profile-setup']);
              } else if (!hasHomepage) {
                // Profile completed but no template selected, go to templates
                this.router.navigate(['/templates']);
              } else {
                // Both profile and template completed, go to dashboard
                this.router.navigate(['/analytics']);
              }
            }
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        // Perform any necessary cleanup or side effects before logging out
      }),
      exhaustMap(() => of(logoutSuccess()))
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      switchMap(() => {
        try {
          const currentUser = localStorage.getItem('currentUser');
          const token = localStorage.getItem('token');
          
          if (currentUser && token) {
            const user = JSON.parse(currentUser);
            // Refresh permissions when fetching user from localStorage
            this.permissionService.loadPermissionsFromStorage();
            return of(fetchUserSuccess({ user }));
          } else {
            return of(fetchUserFailure({ error: 'No user found in localStorage' }));
          }
        } catch (error) {
          return of(fetchUserFailure({ error: 'Failed to parse user data from localStorage' }));
        }
      })
    )
  );

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private permissionService: PermissionService,
    private router: Router) {
  }

}
