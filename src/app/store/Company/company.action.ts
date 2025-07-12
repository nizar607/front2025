import { createAction, props } from '@ngrx/store';
import { CompanyModel } from './company.model';


// fetch company data
export const fetchcompanyData = createAction('[Data] Fetch company Table Data');
export const fetchcompanySuccess = createAction('[Data] Fetch company Data Success', props<{ fetchedCompanyData: any[] }>());
export const fetchcompanyFailure = createAction('[Data] Fetch company Data Failure', props<{ error: string }>());

// Add Data
export const addcompanyData = createAction(
  '[Data] Add companyData',
  props<{ newData: any }>()
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

export const addcompanyDataSuccess = createAction(
  '[Data] Add companyData Success',
  props<{ newData: any }>()
);
export const addcompanyDataFailure = createAction(
  '[Data] Add companyData Failure',
  props<{ error: string }>()
);


// Update Data
export const updatecompanyData = createAction(
  '[Data] Update companyData',
  props<{ id: number, updatedData: any }>()
);

export const updatecompanyDataSuccess = createAction(
  '[Data] Update companyData Success',
  props<{ updatedData: CompanyModel }>()
);
export const updatecompanyDataFailure = createAction(
  '[Data] Update companyData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deletecompanyData = createAction(
  '[Data] Delete companyData',
  props<{ id: string }>()
);
export const deletecompanySuccess = createAction(
  '[Data] Delete companyData Success',
  props<{ id: string }>()
);
export const deletecompanyFailure = createAction(
  '[Data] Delete companyData Failure',
  props<{ error: string }>()
);

// Chained Actions for Company Creation with Image
export const createCompanyWithImage = createAction(
  '[Data] Create Company with Image',
  props<{ companyData: any, imageFile: File | null }>()
);

export const createCompanyWithImageSuccess = createAction(
  '[Data] Create Company with Image Success',
  props<{ company: any }>()
);

export const createCompanyWithImageFailure = createAction(
  '[Data] Create Company with Image Failure',
  props<{ error: string }>()
);
