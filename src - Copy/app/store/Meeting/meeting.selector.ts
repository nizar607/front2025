import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MeetingState } from './meeting.reducer';


export const selectDataState = createFeatureSelector<MeetingState>('MeetingList');

export const selectData = createSelector(
    selectDataState,
    (state: MeetingState) => state.meetingData
);

export const selectNewMeetingData = createSelector(
  selectDataState,
  (state: MeetingState) => state.newMeetingData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: MeetingState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: MeetingState) => state.error
);

