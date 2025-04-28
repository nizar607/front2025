import { Action, createReducer, on } from '@ngrx/store';
import { addpeopleGroupDataSuccess, deletepeopleGroupSuccess, fetchpeopleGroupData, fetchpeopleGroupFailure, fetchpeopleGroupSuccess, updatepeopleGroupDataSuccess } from './peapleGroup.action';



export interface PeopleGroupState {
    peopleGroupdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: PeopleGroupState = {
    peopleGroupdata: [],
    loading: false,
    error: null
};

export const PeopleGroupReducer = createReducer(

    initialState,
    on(fetchpeopleGroupData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchpeopleGroupSuccess, (state, { peopleGroupdata }) => {
        return { ...state, peopleGroupdata, loading: false };
    }),
    on(fetchpeopleGroupFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addpeopleGroupDataSuccess, (state, { newData }) => {
        return { ...state, peopleGroupdata: [newData, ...state.peopleGroupdata], error: null };
    }),
    on(updatepeopleGroupDataSuccess, (state, { updatedData }) => {
        return { ...state, peopleGroupdata: state.peopleGroupdata.map((peopleGroupdata) => peopleGroupdata.id === updatedData.id ? updatedData : peopleGroupdata), error: null };
    }),

    on(deletepeopleGroupSuccess, (state, { id }) => {
        return { ...state, peopleGroupdata: state.peopleGroupdata.filter((peopleGroupdata) => peopleGroupdata.id !== id), error: null }
    }),

)

// Selector
export function reducer(state: PeopleGroupState | undefined, action: Action) {
    return PeopleGroupReducer(state, action);
}
