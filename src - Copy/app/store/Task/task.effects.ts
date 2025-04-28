import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "src/app/core/services/case/task.service";
import { addtaskData, addtaskDataFailure, addtaskDataSuccess, deletetaskData, deletetaskFailure, deletetaskSuccess, fetchtaskData, fetchtaskFailure, fetchtaskSuccess, updatetaskData, updatetaskDataFailure, updatetaskDataSuccess } from "./task.action";

@Injectable()

export class TaskEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtaskData),
            mergeMap(() =>
                this.TaskService.fetchData().pipe(
                    map((taskdata) => fetchtaskSuccess({ taskdata })),

                    catchError((error) =>
                        of(fetchtaskFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addtaskData),
            mergeMap(({ taskData }) =>
                this.TaskService.addData(taskData).pipe(
                    map((newData) => addtaskDataSuccess({ newData })),
                    catchError((error) => of(addtaskDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatetaskData),
            mergeMap(({ id, updatedData }) =>
                this.TaskService.updateData(updatedData).pipe(

                    map((newData) => updatetaskDataSuccess({ updatedData : newData })),
                    catchError((error) => of(updatetaskDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletetaskData),
            mergeMap(({ id }) =>
                this.TaskService.deleteData( id ).pipe(
                    map(() => deletetaskSuccess({ id })),
                    catchError((error) => of(deletetaskFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private TaskService: TaskService
    ) { }
}