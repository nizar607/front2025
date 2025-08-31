import {Action, createReducer, on} from '@ngrx/store';
import {
  addinvoiceDataSuccess,
  deleteinvoiceSuccess,
  fetchinvoiceData,
  fetchinvoiceFailure,
  fetchinvoiceSuccess,
  updateinvoiceDataSuccess,
  uploadImageSuccess
} from './invoice.action';


export interface InvoiceState {
  invoiceData: any[];
  loading: boolean;
  error: any;
}

export const initialState: InvoiceState = {
  invoiceData: [],
  loading: false,
  error: null
};

export const InvoiceReducer = createReducer(
  initialState,
  on(fetchinvoiceData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchinvoiceSuccess, (state, {fetchedInvoiceData}) => {
    console.log("fetchedInvoiceData ", fetchedInvoiceData);
    return {...state, invoiceData:fetchedInvoiceData, loading: false};
  }),

  on(fetchinvoiceFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addinvoiceDataSuccess, (state, {newData}) => {
    return {...state, invoiceData: [newData, ...state.invoiceData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, invoiceData: [newData, ...state.invoiceData], error: null};
  }),

  on(updateinvoiceDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      invoiceData: state.invoiceData.map((invoicedata) => invoicedata.id === updatedData.id ? updatedData : invoicedata),
      error: null
    };
  }),

  on(deleteinvoiceSuccess, (state, {id}) => {
    const updatedlist = state.invoiceData.filter((invoicedata) => !id.includes(invoicedata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, invoiceData: updatedlist, error: null};
  }),
)

// Selector
export function reducer(state: InvoiceState | undefined, action: Action) {
  return InvoiceReducer(state, action);
}
