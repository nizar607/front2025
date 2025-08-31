import { Action, createReducer, on } from '@ngrx/store';
import {
    addprofileDataSuccess,
    deleteprofileSuccess,
    fetchprofileData,
    fetchprofileFailure,
    fetchprofileSuccess,
    updateprofileDataSuccess,
    uploadImageSuccess
} from './profile.action';


export interface ProfileState {
    profiledata: any;
    loading: boolean;
    error: any;
}

export const initialState: ProfileState = {
    profiledata: null,
    loading: false,
    error: null
};

export const ProfileReducer = createReducer(

    initialState,
    on(fetchprofileData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchprofileSuccess, (state, { profiledata }) => {
        return { ...state, profiledata, loading: false };
    }),
    on(fetchprofileFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addprofileDataSuccess, (state, { newData }) => {
        return { ...state, profiledata: [newData, ...state.profiledata], error: null };
    }),

    on(uploadImageSuccess, (state, { newData }) => {
        console.log("newData ", newData);
        return { ...state, profiledata: [newData, ...state.profiledata], error: null };
    }),

    on(updateprofileDataSuccess, (state, { updatedData }) => {
        return { ...state, profiledata: updatedData, error: null };
    }),

    on(deleteprofileSuccess, (state, { id }) => {
        const updatedlist = state.profiledata.filter((profiledata: any) => !id.includes(profiledata.id));
        console.log("updatedlist ", updatedlist);
        return { ...state, profiledata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: ProfileState | undefined, action: Action) {
    return ProfileReducer(state, action);
}
