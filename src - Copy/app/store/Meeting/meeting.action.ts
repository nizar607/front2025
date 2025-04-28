import { createAction, props } from '@ngrx/store';


// fetch meeting data
export const fetchmeetingData = createAction('[Data] Fetch meeting Table Data');
export const fetchmeetingSuccess = createAction('[Data] Fetch meeting Data Success', props<{ meetingdata: any[] }>());
export const fetchmeetingFailure = createAction('[Data] Fetch meeting Data Failure', props<{ error: string }>());

// Add Data
export const addmeetingData = createAction(
  '[Data] Add meetingData',
  props<{ newData: any }>()
);
export const addmeetingDataSuccess = createAction(
  '[Data] Add meetingData Success',
  props<{ newData: any }>()
);
export const addmeetingDataFailure = createAction(
  '[Data] Add meetingData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatemeetingData = createAction(
  '[Data] Update meetingData',
  props<{ updatedData: any }>()
);
export const updatemeetingDataSuccess = createAction(
  '[Data] Update meetingData Success',
  props<{ updatedData: any }>()
);
export const updatemeetingDataFailure = createAction(
  '[Data] Update meetingData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletemeetingData = createAction(
  '[Data] Delete meetingData',
  props<{ id: string }>()
);
export const deletemeetingSuccess = createAction(
  '[Data] Delete meetingData Success',
  props<{ id: string }>()
);
export const deletemeetingFailure = createAction(
  '[Data] Delete meetingData Failure',
  props<{ error: string }>()
);
