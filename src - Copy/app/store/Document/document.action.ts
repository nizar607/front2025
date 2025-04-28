import { createAction, props } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';


// fetch document data
export const fetchdocumentData = createAction('[Data] Fetch document Table Data');
export const fetchDocumentsByCase = createAction('[Data] Fetch document Table Data By Case', props<{ caseId: string }>());
export const fetchdocumentSuccess = createAction('[Data] Fetch document Data Success', props<{
  documentdata: any[]
}>());
export const fetchdocumentFailure = createAction('[Data] Fetch document Data Failure', props<{ error: string }>());

// Add Data
export const adddocumentData = createAction(
  '[Data] Add documentData',
  props<{ newData: FormData }>()
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


export const addDocumentData = createAction(
  '[Data] Add documentData',
  props<{ newData: FormData }>()
);

export const adddocumentDataSuccess = createAction(
  '[Data] Add documentData Success',
  props<{ newData: any }>()
);
export const adddocumentDataFailure = createAction(
  '[Data] Add documentData Failure',
  props<{ error: string }>()
);




// Delete Data
export const deletedocumentData = createAction(
  '[Data] Delete documentData',
  props<{ id: string }>()
);
export const deletedocumentSuccess = createAction(
  '[Data] Delete documentData Success',
  props<{ id: string }>()
);
export const deletedocumentFailure = createAction(
  '[Data] Delete documentData Failure',
  props<{ error: string }>()
);



// Update Data
export const updatedocumentData = createAction(
  '[Data] Update documentData',
  props<{ updatedData: FormData }>()
);
export const updatedocumentDataSuccess = createAction(
  '[Data] Update documentData Success',
  props<{ updatedData: any }>()
);
export const updatedocumentDataFailure = createAction(
  '[Data] Update documentData Failure',
  props<{ error: string }>()
);
