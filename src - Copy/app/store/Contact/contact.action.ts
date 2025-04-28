import { createAction, props } from '@ngrx/store';
import { contactModel } from './contact.model';



// fetch contact data
export const fetchcontactData = createAction('[Data] Fetch contact Table Data');
export const fetchcontactSuccess = createAction('[Data] Fetch contact Data Success', props<{ contactdata: contactModel[] }>());
export const fetchcontactFailure = createAction('[Data] Fetch contact Data Failure', props<{ error: string }>());

// Add Data
export const addcontactData = createAction(
    '[Data] Add contactData',
    props<{ contactData : any }>()
);
export const addcontactDataSuccess = createAction(
    '[Data] Add contactData Success',
    props<{ newData: any }>()
);
export const addcontactDataFailure = createAction(
    '[Data] Add contactData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatecontactData = createAction(
    '[Data] Update contactData',
    props<{ id : string, updatedData: any }>()
);
export const updatecontactDataSuccess = createAction(
    '[Data] Update contactData Success',
    props<{ updatedData: any }>()
);
export const updatecontactDataFailure = createAction(
    '[Data] Update contactData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletecontactData = createAction(
    '[Data] Delete contactData',
    props<{ id: string }>()
);
export const deletecontactSuccess = createAction(
    '[Data] Delete contactData Success',
    props<{ id: string }>()
);
export const deletecontactFailure = createAction(
    '[Data] Delete contactData Failure',
    props<{ error: string }>()
);