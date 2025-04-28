import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';


export const selectDataState = createFeatureSelector<TaskState>('TaskList');

export const selectData = createSelector(
    selectDataState,
    (state: TaskState) => state.taskdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: TaskState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: TaskState) => state.error
);

