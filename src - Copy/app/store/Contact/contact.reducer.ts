import { Action, createReducer, on } from '@ngrx/store';
import { addcontactDataSuccess, deletecontactSuccess, fetchcontactData, fetchcontactFailure, fetchcontactSuccess, updatecontactDataSuccess } from './contact.action';



export interface ContactState {
    contactdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: ContactState = {
    contactdata: [],
    loading: false,
    error: null
};

export const ContactReducer = createReducer(

    initialState,
    on(fetchcontactData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcontactSuccess, (state, { contactdata }) => {
        return { ...state, contactdata, loading: false };
    }),
    on(fetchcontactFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addcontactDataSuccess, (state, { newData }) => {
        return { ...state, contactdata: [newData, ...state.contactdata], error: null };
    }),
    on(updatecontactDataSuccess, (state, { updatedData }) => {
        return { ...state, contactdata: state.contactdata.map((contactdata) => contactdata.id === updatedData.id ? updatedData : contactdata), error: null };
    }),

    on(deletecontactSuccess, (state, { id }) => {
        return { ...state, contactdata: state.contactdata.filter((contactdata) => contactdata.id !== id), error: null }
    }),

)

// Selector
export function reducer(state: ContactState | undefined, action: Action) {
    return ContactReducer(state, action);
}