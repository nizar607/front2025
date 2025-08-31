import { createAction, props } from '@ngrx/store';
import { UserModel } from './users.model';


// fetch User data
export const fetchUserData = createAction('[Data] Fetch User Table Data');
export const fetchUserDataSuccess = createAction('[Data] Fetch User Data Success', props<{ userData: any[] }>());
export const fetchUserDataFailure = createAction('[Data] Fetch User Data Failure', props<{ error: string }>());


// Update Data
export const updateUserData = createAction(
    '[Data] Update UserData',
    props<{ updatedData: any }>()
);


export const updateUserDataSuccess = createAction(
    '[Data] Update UserData Success',
    props<{ updatedData: any }>()
);


export const updateUserDataFailure = createAction(
    '[Data] Update UserData Failure',
    props<{ error: string }>()
);

// Fetch User Stats
export const fetchUserStats = createAction('[Data] Fetch User Stats');
export const fetchUserStatsSuccess = createAction('[Data] Fetch User Stats Success', props<{ userStats: any }>());
export const fetchUserStatsFailure = createAction('[Data] Fetch User Stats Failure', props<{ error: string }>());