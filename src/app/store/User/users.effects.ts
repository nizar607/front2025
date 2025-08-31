import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { updateUserData, updateUserDataFailure, updateUserDataSuccess, fetchUserData, fetchUserDataSuccess, fetchUserDataFailure, fetchUserStats, fetchUserStatsSuccess, fetchUserStatsFailure } from "./users.action";
import { UserService } from "src/app/core/services/user/user.service";


@Injectable()

export class UserEffects {
    fetchlistData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserData),
            mergeMap(() =>
                this.userService.fetchData().pipe(
                    map((userData) => fetchUserDataSuccess({ userData })),
                    catchError((error) =>
                        of(fetchUserDataFailure({ error }))
                    )

                )
            )
        )
    );

    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserData),
            mergeMap(() =>
                this.userService.fetchData().pipe(
                    map((userData) => fetchUserDataSuccess({ userData })),
                    catchError((error) =>
                        of(fetchUserDataFailure({ error }))
                    )

                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserData),
            tap(() => console.log('Effect triggered with data')),
            mergeMap(({ updatedData }) => {
                console.log('Sending data to service: ', updatedData);
                return this.userService.enableData(updatedData.id, updatedData.enabled).pipe(
                    map((response) => {
                        console.log('Response from service: ', response);
                        return updateUserDataSuccess({ updatedData: response });
                    }),
                    catchError((error) => {
                        console.error('Error in effect: ', error);
                        return of(updateUserDataFailure({ error }));
                    })
                );
            })
        )
    );

    fetchUserStats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUserStats),
            mergeMap(() =>
                this.userService.getUserStats().pipe(
                    map((userStats) => fetchUserStatsSuccess({ userStats })),
                    catchError((error) =>
                        of(fetchUserStatsFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}