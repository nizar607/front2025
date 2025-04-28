import {User} from "../Authentication/auth.models";
import {meetingModel} from "../Meeting/meeting.model";

export interface PhaseModel {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  concernedCase: any;
}
