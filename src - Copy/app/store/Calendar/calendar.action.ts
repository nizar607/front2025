import {createAction, props} from '@ngrx/store';
import {CalendarModel} from './calendar.model';


// fetch Calendar data
export const fetchCalendarData = createAction('[Data] Fetch Calendar Table Data');
export const fetchCalendarSuccess = createAction('[Data] Fetch Calendar Data Success', props<{ calendarData: any[] }>());
export const fetchCalendarFailure = createAction('[Data] Fetch Calendar Data Failure', props<{ error: string }>());
export const fetchSelectedCalendarData = createAction('[Data] Fetch Selected Calendar',props<{ id: string }>());
export const fetchSelectedCalendarDataSuccess = createAction('[Data] Fetch Selected Calendar Success',props<{ selectedCalendar: any }>());
export const fetchSelectedCalendarDataFailure = createAction('[Data] Fetch Selected Calendar Failure',props<{ error: string }>());

// Add Data
export const addCalendarData = createAction(
  '[Data] Add CalendarData',
  props<{ newData: any }>()
);


export const addCalendarDataSuccess = createAction(
  '[Data] Add CalendarData Success',
  props<{ newData: any }>()
);


export const addCalendarDataFailure = createAction(
  '[Data] Add CalendarData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateCalendarData = createAction(
  '[Data] Update CalendarData',
  props<{ updatedData: CalendarModel }>()
);
export const updateCalendarDataSuccess = createAction(
  '[Data] Update CalendarData Success',
  props<{ updatedData: CalendarModel }>()
);
export const updateCalendarDataFailure = createAction(
  '[Data] Update CalendarData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteCalendarData = createAction(
  '[Data] Delete CalendarData',
  props<{ id: string }>()
);
export const deleteCalendarSuccess = createAction(
  '[Data] Delete CalendarData Success',
  props<{ id: string }>()
);
export const deleteCalendarFailure = createAction(
  '[Data] Delete CalendarData Failure',
  props<{ error: string }>()
);
