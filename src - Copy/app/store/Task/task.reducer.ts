import { Action, createReducer, on } from '@ngrx/store';
import { addtaskDataSuccess, deletetaskSuccess, fetchtaskData, fetchtaskFailure, fetchtaskSuccess, updatetaskDataSuccess } from './task.action';



export interface TaskState {
    taskdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: TaskState = {
    taskdata: [],
    loading: false,
    error: null
};

export const TaskReducer = createReducer(

    initialState,
    on(fetchtaskData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtaskSuccess, (state, { taskdata }) => {
        return { ...state, taskdata, loading: false };
    }),
    on(fetchtaskFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addtaskDataSuccess, (state, { newData }) => {
        return { ...state, taskdata: [newData, ...state.taskdata], error: null };
    }),
    on(updatetaskDataSuccess, (state, { updatedData }) => {
        return { ...state, taskdata: state.taskdata.map((taskdata) => taskdata.id === updatedData.id ? updatedData : taskdata), error: null };
    }),

    on(deletetaskSuccess, (state, { id }) => {
        return { ...state, taskdata: state.taskdata.filter((taskdata) => taskdata.id !== id), error: null }
    }),

)

// Selector
export function reducer(state: TaskState | undefined, action: Action) {
    return TaskReducer(state, action);
}