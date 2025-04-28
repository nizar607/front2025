import {Injectable} from "@angular/core";
import {exhaustAll, of, switchMap} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AgentService} from "src/app/core/services/agent/agent.service";
import {
  addagentData,
  addagentDataFailure,
  addagentDataSuccess,
  deleteagentData,
  deleteagentFailure,
  deleteagentSuccess,
  fetchagentData,
  fetchagentFailure,
  fetchagentSuccess,
  updateagentData,
  updateagentDataFailure,
  updateagentDataSuccess,
  uploadImage,
  uploadImageSuccess,
  uploadImageFailure
} from "./agent.action";
import {fetchsalesFailure} from "../Ecommerce/ecommerce.actions";
import {AgentModel} from "./agent.model";


@Injectable()
export class AgentEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchagentData),
      mergeMap(() =>
        this.agentService.fetchData().pipe(
          map((agentdata) => fetchagentSuccess({agentdata})),
          catchError((error) =>
            of(fetchagentFailure({error}))
          )
        )
      )
    )
  );

  addData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addagentData),
      mergeMap(({newData}) =>
        this.agentService.addData(newData).pipe(
          map((addedAgent: any) => addagentDataSuccess({newData: addedAgent})),
          catchError((error) => of(addagentDataFailure({error})))
        )
      )
    )
  );


  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateagentData),
      mergeMap(({updatedData}) =>
        this.agentService.updateData(updatedData).pipe(
          map((newUpdatedData:any) => updateagentDataSuccess({updatedData:newUpdatedData})),
          catchError((error) => of(updateagentDataFailure({error})))
        )
      )
    )
  );



  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteagentData),
      mergeMap(({id}) =>
        this.agentService.deleteData(id).pipe(
          map(() => deleteagentSuccess({id})),
          catchError((error) => of(deleteagentFailure({error})))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private agentService: AgentService
  ) {
  }
}
