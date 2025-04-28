import {Action, createReducer, on} from '@ngrx/store';
import {
  addmeetingData,
  addmeetingDataSuccess,
  deletemeetingFailure,
  deletemeetingSuccess,
  fetchmeetingData,
  fetchmeetingFailure,
  fetchmeetingSuccess,
  updatemeetingData,
  updatemeetingDataSuccess
} from './meeting.action';
import {createEventId} from "../../pages/apps/calendar/data";


export interface MeetingState {
  meetingData: any[];
  newMeetingData: any;
  loading: boolean;
  error: any;
}

export const initialState: MeetingState = {
  meetingData: [],
  newMeetingData: null,
  loading: false,
  error: null
};

export const MeetingReducer = createReducer(
  initialState,
  on(fetchmeetingData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchmeetingSuccess, (state, {meetingdata}) => {
    console.log("from reducer meetingdata", meetingdata);
    meetingdata.forEach((meetingdata) => {
      return {
        ...meetingdata,
        start: new Date(meetingdata.start),
        end: new Date(new Date(meetingdata.end).setDate(new Date(meetingdata.end).getDate() - 1)),
        className: "bg-danger-subtle",
      }
    });

    return {...state, meetingData: meetingdata, loading: false};
  }),
  
  on(fetchmeetingFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addmeetingDataSuccess, (state, {newData}) => {
    const newMeetingData = {...newData, id: createEventId(), start: new Date(newData.start), end: new Date(new Date(newData.end).setDate(new Date(newData.end).getDate() - 1)), className: "bg-danger-subtle"};
    return {...state, meetingData: [newData, ...state.meetingData],newMeetingData:newMeetingData, error: null};
  }),
  on(updatemeetingDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      meetingData: state.meetingData.map((meetingdata) => meetingdata.id === updatedData.id ? updatedData : meetingdata),
      error: null
    };
  }),

  on(deletemeetingSuccess, (state, {id}) => {
    return {...state, meetingData: state.meetingData.filter((meetingData) => meetingData.id !== id), error: null}
  }),
)

// Selector
export function reducer(state: MeetingState | undefined, action: Action) {
  return MeetingReducer(state, action);
}
