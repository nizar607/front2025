import {createAction, props} from '@ngrx/store';
import {PhaseModel} from './phase.model';


// fetch Phase data
export const fetchPhaseData = createAction('[Data] Fetch Phase Table Data');
export const fetchPhaseSuccess = createAction('[Data] Fetch Phase Data Success', props<{ phaseData: any[] }>());
export const fetchPhaseFailure = createAction('[Data] Fetch Phase Data Failure', props<{ error: string }>());
export const fetchSelectedPhaseData = createAction('[Data] Fetch Selected Phase',props<{ id: string }>());
export const fetchSelectedPhaseDataSuccess = createAction('[Data] Fetch Selected Phase Success',props<{ selectedPhase: any }>());
export const fetchSelectedPhaseDataFailure = createAction('[Data] Fetch Selected Phase Failure',props<{ error: string }>());

// Add Data
export const addPhaseData = createAction(
  '[Data] Add PhaseData',
  props<{ newData: any }>()
);


export const addPhaseDataSuccess = createAction(
  '[Data] Add PhaseData Success',
  props<{ newData: any }>()
);


export const addPhaseDataFailure = createAction(
  '[Data] Add PhaseData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatePhaseData = createAction(
  '[Data] Update PhaseData',
  props<{ updatedData: PhaseModel }>()
);
export const updatePhaseDataSuccess = createAction(
  '[Data] Update PhaseData Success',
  props<{ updatedData: PhaseModel }>()
);
export const updatePhaseDataFailure = createAction(
  '[Data] Update PhaseData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletePhaseData = createAction(
  '[Data] Delete PhaseData',
  props<{ id: string }>()
);
export const deletePhaseSuccess = createAction(
  '[Data] Delete PhaseData Success',
  props<{ id: string }>()
);
export const deletePhaseFailure = createAction(
  '[Data] Delete PhaseData Failure',
  props<{ error: string }>()
);
