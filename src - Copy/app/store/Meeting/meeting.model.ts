import {CaseModel} from "../Case/case.model";

export interface meetingModel {
  id: string;
  date: string;
  duration: string;
  purpose: string;
  _case: CaseModel;

}
