import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, Register, RegisterSuccess, RegisterFailure } from './authentication.actions';
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
              this.router.navigate(['/analytics']);
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

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router) {
  }

}
