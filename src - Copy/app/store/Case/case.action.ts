import {createAction, props} from '@ngrx/store';
import {CaseModel} from './case.model';


// fetch Case data
export const fetchCaseData = createAction('[Data] Fetch Case Table Data');
export const fetchCaseSuccess = createAction('[Data] Fetch Case Data Success', props<{ caseData: any[] }>());
export const fetchCaseFailure = createAction('[Data] Fetch Case Data Failure', props<{ error: string }>());
export const fetchSelectedCaseData = createAction('[Data] Fetch Selected Case',props<{ id: string }>());
export const fetchSelectedCaseDataSuccess = createAction('[Data] Fetch Selected Case Success',props<{ selectedCase: any }>());
export const fetchSelectedCaseDataFailure = createAction('[Data] Fetch Selected Case Failure',props<{ error: string }>());

// Add Data
export const addCaseData = createAction(
  '[Data] Add CaseData',
  props<{ newData: any }>()
);


export const addCaseDataSuccess = createAction(
  '[Data] Add CaseData Success',
  props<{ newData: any }>()
);


export const addCaseDataFailure = createAction(
  '[Data] Add CaseData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateCaseData = createAction(
  '[Data] Update CaseData',
  props<{ updatedData: CaseModel }>()
);
export const updateCaseDataSuccess = createAction(
  '[Data] Update CaseData Success',
  props<{ updatedData: CaseModel }>()
);
export const updateCaseDataFailure = createAction(
  '[Data] Update CaseData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteCaseData = createAction(
  '[Data] Delete CaseData',
  props<{ id: string }>()
);
export const deleteCaseSuccess = createAction(
  '[Data] Delete CaseData Success',
  props<{ id: string }>()
);
export const deleteCaseFailure = createAction(
  '[Data] Delete CaseData Failure',
  props<{ error: string }>()
);
