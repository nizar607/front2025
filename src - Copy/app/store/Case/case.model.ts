import {User} from "../Authentication/auth.models";
import {meetingModel} from "../Meeting/meeting.model";

export interface CaseModel {
  id: string;

  title: string;
  number: string;
  description: string;
  type: string;
  status: string;

  lawyer: User;
  // contact: Set<Contact>;
  // opposingParty: OpposingParty;
  // phases: Set<Phase>;

  //currentPhase: Phase;
  //notes: Set<Note>;
  agents: Set<User>;
  meetings: Set<meetingModel>;

  lastMeeting: meetingModel;
}
