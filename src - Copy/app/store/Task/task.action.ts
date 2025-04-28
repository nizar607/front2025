import { createAction, props } from '@ngrx/store';
import { taskModel } from './task.model';



// fetch task data
export const fetchtaskData = createAction('[Data] Fetch task Table Data');
export const fetchtaskSuccess = createAction('[Data] Fetch task Data Success', props<{ taskdata: taskModel[] }>());
export const fetchtaskFailure = createAction('[Data] Fetch task Data Failure', props<{ error: string }>());

// Add Data
export const addtaskData = createAction(
    '[Data] Add taskData',
    props<{ taskData : any }>()
);
export const addtaskDataSuccess = createAction(
    '[Data] Add taskData Success',
    props<{ newData: any }>()
);
export const addtaskDataFailure = createAction(
    '[Data] Add taskData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatetaskData = createAction(
    '[Data] Update taskData',
    props<{ id : string, updatedData: any }>()
);
export const updatetaskDataSuccess = createAction(
    '[Data] Update taskData Success',
    props<{ updatedData: any }>()
);
export const updatetaskDataFailure = createAction(
    '[Data] Update taskData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletetaskData = createAction(
    '[Data] Delete taskData',
    props<{ id: string }>()
);
export const deletetaskSuccess = createAction(
    '[Data] Delete taskData Success',
    props<{ id: string }>()
);
export const deletetaskFailure = createAction(
    '[Data] Delete taskData Failure',
    props<{ error: string }>()
);