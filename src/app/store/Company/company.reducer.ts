import {Action, createReducer, on} from '@ngrx/store';
import {
  addcompanyDataSuccess,
  deletecompanySuccess,
  fetchcompanyData,
  fetchcompanyFailure,
  fetchcompanySuccess,
  updatecompanyDataSuccess,
  uploadImageSuccess,
  createCompanyWithImage,
  createCompanyWithImageSuccess,
  createCompanyWithImageFailure
} from './company.action';


export interface CompanyState {
  companyData: any[];
  loading: boolean;
  error: any;
}

export const initialState: CompanyState = {
  companyData: [],
  loading: false,
  error: null
};

export const CompanyReducer = createReducer(
  initialState,
  on(fetchcompanyData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchcompanySuccess, (state, {fetchedCompanyData}) => {
    console.log("fetchedCompanyData ", fetchedCompanyData);
    return {...state, companyData:fetchedCompanyData, loading: false};
  }),

  on(fetchcompanyFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addcompanyDataSuccess, (state, {newData}) => {
    return {...state, companyData: [newData, ...state.companyData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, companyData: [newData, ...state.companyData], error: null};
  }),

  on(updatecompanyDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      companyData: state.companyData.map((companydata) => companydata.id === updatedData.id ? updatedData : companydata),
      error: null
    };
  }),

  on(deletecompanySuccess, (state, {id}) => {
    const updatedlist = state.companyData.filter((companydata) => !id.includes(companydata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, companyData: updatedlist, error: null};
  }),

  on(createCompanyWithImage, (state) => {
    console.log("create company from reducer");
    return {...state, loading: true, error: null};
  }),

  on(createCompanyWithImageSuccess, (state, {company}) => {
    return {...state, companyData: [company, ...state.companyData], loading: false, error: null};
  }),

  on(createCompanyWithImageFailure, (state, {error}) => {
    return {...state, loading: false, error};
  }),
)

// Selector
export function reducer(state: CompanyState | undefined, action: Action) {
  return CompanyReducer(state, action);
}
