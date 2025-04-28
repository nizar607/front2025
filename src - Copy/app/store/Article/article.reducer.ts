import {Action, createReducer, on} from '@ngrx/store';
import {
  addarticleDataSuccess,
  deletearticleSuccess,
  fetcharticleData,
  fetcharticleFailure,
  fetcharticleSuccess,
  updatearticleDataSuccess,
  uploadImageSuccess
} from './article.action';


export interface ArticleState {
  articleData: any[];
  loading: boolean;
  error: any;
}

export const initialState: ArticleState = {
  articleData: [],
  loading: false,
  error: null
};

export const ArticleReducer = createReducer(
  initialState,
  on(fetcharticleData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetcharticleSuccess, (state, {fetchedArticleData}) => {
    console.log("fetchedArticleData ", fetchedArticleData);
    return {...state, articleData:fetchedArticleData, loading: false};
  }),

  on(fetcharticleFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addarticleDataSuccess, (state, {newData}) => {
    return {...state, articleData: [newData, ...state.articleData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, articleData: [newData, ...state.articleData], error: null};
  }),

  on(updatearticleDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      articleData: state.articleData.map((articledata) => articledata.id === updatedData.id ? updatedData : articledata),
      error: null
    };
  }),

  on(deletearticleSuccess, (state, {id}) => {
    const updatedlist = state.articleData.filter((articledata) => !id.includes(articledata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, articleData: updatedlist, error: null};
  }),
)

// Selector
export function reducer(state: ArticleState | undefined, action: Action) {
  return ArticleReducer(state, action);
}
