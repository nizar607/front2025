import { createAction, props } from '@ngrx/store';
import { InvoiceModel } from './invoice.model';


// fetch invoice data
export const fetchinvoiceData = createAction('[Data] Fetch invoice Table Data');
export const fetchinvoiceSuccess = createAction('[Data] Fetch invoice Data Success', props<{ fetchedInvoiceData: any[] }>());
export const fetchinvoiceFailure = createAction('[Data] Fetch invoice Data Failure', props<{ error: string }>());

// Add Data
export const addinvoiceData = createAction(
  '[Data] Add invoiceData',
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

export const addinvoiceDataSuccess = createAction(
  '[Data] Add invoiceData Success',
  props<{ newData: any }>()
);
export const addinvoiceDataFailure = createAction(
  '[Data] Add invoiceData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateinvoiceData = createAction(
  '[Data] Update invoiceData',
  props<{ id: number, updatedData: any }>()
);

export const updateinvoiceDataSuccess = createAction(
  '[Data] Update invoiceData Success',
  props<{ updatedData: InvoiceModel }>()
);
export const updateinvoiceDataFailure = createAction(
  '[Data] Update invoiceData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteinvoiceData = createAction(
  '[Data] Delete invoiceData',
  props<{ id: string }>()
);
export const deleteinvoiceSuccess = createAction(
  '[Data] Delete invoiceData Success',
  props<{ id: string }>()
);
export const deleteinvoiceFailure = createAction(
  '[Data] Delete invoiceData Failure',
  props<{ error: string }>()
);
