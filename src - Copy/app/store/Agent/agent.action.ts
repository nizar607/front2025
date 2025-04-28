import {createAction, props} from '@ngrx/store';
import {AgentModel} from './agent.model';


// fetch agent data
export const fetchagentData = createAction('[Data] Fetch agent Table Data');
export const fetchagentSuccess = createAction('[Data] Fetch agent Data Success', props<{
  agentdata: AgentModel[]
}>());
export const fetchagentFailure = createAction('[Data] Fetch agent Data Failure', props<{ error: string }>());

// Add Data
export const addagentData = createAction(
  '[Data] Add agentData',
  props<{ newData:FormData }>()
);

export const uploadImage = createAction(
  '[Data] Image Uploading',
  props<{ newData: FormData }>()
);

export const uploadImageSuccess = createAction(
  '[Data] Image Upload Success',
  props<{ newData: any }>()
);

export const uploadImageFailure = createAction(
  '[Data] Image Upload Failure',
  props<{ error: string }>()
);

/*
export const addagentData = createAction(
    '[Data] Add agentData',
    props<{ agentData : AgentModel,newData: FormData }>()
);
 */
export const addagentDataSuccess = createAction(
  '[Data] Add agentData Success',
  props<{ newData: any }>()
);
export const addagentDataFailure = createAction(
  '[Data] Add agentData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateagentData = createAction(
  '[Data] Update agentData',
  props<{ updatedData: FormData }>()
);
export const updateagentDataSuccess = createAction(
  '[Data] Update agentData Success',
  props<{ updatedData: AgentModel }>()
);
export const updateagentDataFailure = createAction(
  '[Data] Update agentData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteagentData = createAction(
  '[Data] Delete agentData',
  props<{ id: string }>()
);
export const deleteagentSuccess = createAction(
  '[Data] Delete agentData Success',
  props<{ id: string }>()
);
export const deleteagentFailure = createAction(
  '[Data] Delete agentData Failure',
  props<{ error: string }>()
);
