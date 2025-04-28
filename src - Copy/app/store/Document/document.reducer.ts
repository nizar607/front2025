import { Action, createReducer, on } from '@ngrx/store';
import {
  adddocumentDataSuccess,
  deletedocumentSuccess,
  fetchdocumentData,
  fetchdocumentFailure,
  fetchDocumentsByCase,
  fetchdocumentSuccess,
  updatedocumentDataSuccess,
  uploadImageSuccess
} from './document.action';


export interface DocumentState {
    documentdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: DocumentState = {
    documentdata: [],
    loading: false,
    error: null
};

export const DocumentReducer = createReducer(

    initialState,
    on(fetchdocumentData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchDocumentsByCase, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchdocumentSuccess, (state, { documentdata }) => {
        return { ...state, documentdata, loading: false };
    }),
    on(fetchdocumentFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(adddocumentDataSuccess, (state, { newData }) => {
        return { ...state, documentdata: [newData, ...state.documentdata], error: null };
    }),

  on(uploadImageSuccess, (state, { newData }) => {
    console.log("newData ", newData);
    return { ...state, documentdata: [newData, ...state.documentdata], error: null };
  }),

    on(updatedocumentDataSuccess, (state, { updatedData }) => {
        return { ...state, documentdata: state.documentdata.map((documentdata) => documentdata.id === updatedData.id ? updatedData : documentdata), error: null };
    }),

    on(deletedocumentSuccess, (state, { id }) => {
        const updatedlist = state.documentdata.filter((documentdata) => !id.includes(documentdata.id));
        console.log("updatedlist ", updatedlist);
        return { ...state, documentdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: DocumentState | undefined, action: Action) {
    return DocumentReducer(state, action);
}
