import {User} from "../Authentication/auth.models";
import {meetingModel} from "../Meeting/meeting.model";

export interface CalendarModel {
  id:string,
  title: string,
  start: string,
  end: string,
  description: string,
  location: string,
  category: string,
  }
