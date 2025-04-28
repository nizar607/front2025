import { createAction, props } from '@ngrx/store';


// fetch hearing data
export const fetchHearingData = createAction('[Data] Fetch hearing Table Data');
export const fetchHearingSuccess = createAction('[Data] Fetch hearing Data Success', props<{ hearingdata: any[] }>());
export const fetchHearingFailure = createAction('[Data] Fetch hearing Data Failure', props<{ error: string }>());

// Add Data
export const addHearingData = createAction(
  '[Data] Add hearingData',
  props<{ newData: any }>()
);
export const addHearingDataSuccess = createAction(
  '[Data] Add hearingData Success',
  props<{ newData: any }>()
);
export const addHearingDataFailure = createAction(
  '[Data] Add hearingData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateHearingData = createAction(
  '[Data] Update hearingData',
  props<{ updatedData: any }>()
);
export const updateHearingDataSuccess = createAction(
  '[Data] Update hearingData Success',
  props<{ updatedData: any }>()
);
export const updateHearingDataFailure = createAction(
  '[Data] Update hearingData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteHearingData = createAction(
  '[Data] Delete hearingData',
  props<{ id: string }>()
);
export const deleteHearingSuccess = createAction(
  '[Data] Delete hearingData Success',
  props<{ id: string }>()
);
export const deleteHearingFailure = createAction(
  '[Data] Delete hearingData Failure',
  props<{ error: string }>()
);
