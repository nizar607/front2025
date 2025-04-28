import { createAction, props } from '@ngrx/store';
import { peopleGroupModel } from './peapleGroup.model';



// fetch peopleGroup data
export const fetchpeopleGroupData = createAction('[Data] Fetch peopleGroup Table Data');
export const fetchpeopleGroupSuccess = createAction('[Data] Fetch peopleGroup Data Success', props<{ peopleGroupdata: peopleGroupModel[] }>());
export const fetchpeopleGroupFailure = createAction('[Data] Fetch peopleGroup Data Failure', props<{ error: string }>());

// Add Data
export const addpeopleGroupData = createAction(
    '[Data] Add peopleGroupData',
    props<{ name : string}>()
);
export const addpeopleGroupDataSuccess = createAction(
    '[Data] Add peopleGroupData Success',
    props<{ newData: any }>()
);
export const addpeopleGroupDataFailure = createAction(
    '[Data] Add peopleGroupData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatepeopleGroupData = createAction(
    '[Data] Update peopleGroupData',
    props<{ updatedData: peopleGroupModel }>()
);
export const updatepeopleGroupDataSuccess = createAction(
    '[Data] Update peopleGroupData Success',
    props<{ updatedData: peopleGroupModel }>()
);
export const updatepeopleGroupDataFailure = createAction(
    '[Data] Update peopleGroupData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletepeopleGroupData = createAction(
    '[Data] Delete peopleGroupData',
    props<{ id: string }>()
);
export const deletepeopleGroupSuccess = createAction(
    '[Data] Delete peopleGroupData Success',
    props<{ id: string }>()
);
export const deletepeopleGroupFailure = createAction(
    '[Data] Delete peopleGroupData Failure',
    props<{ error: string }>()
);