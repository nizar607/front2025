import { Action, createReducer, on } from '@ngrx/store';
import {
  addarticleDataSuccess,
  addfavoriteByArticleDataSuccess,
  deletearticleSuccess,
  deleteFavoriteArticleSuccess,
  deleteFavoriteArticleFailure,
  fetcharticleData,
  fetcharticleFailure,
  fetcharticleSuccess,
  fetchfavoriteArticlesByUserData,
  fetchSingleArticleData,
  fetchSingleArticleSuccess,
  fetchSingleArticleFailure,
  searcharticleData,
  searcharticleSuccess,
  searcharticleFailure,
  updatearticleDataSuccess,
  uploadImageSuccess
} from './article.action';


export interface ArticleState {
  articleData: any[];
  article: any;
  loading: boolean;
  error: any;
}

export const initialState: ArticleState = {
  articleData: [],
  article: null,
  loading: false,
  error: null
};

export const ArticleReducer = createReducer(
  initialState,
  on(fetcharticleData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchfavoriteArticlesByUserData, (state) => {
    return { ...state, loading: true, error: null };
  }
  ),
  on(fetcharticleSuccess, (state, { fetchedArticleData }) => {
    console.log("fetchedArticleData ", fetchedArticleData);
    return { ...state, articleData: fetchedArticleData, loading: false };
  }),

  on(fetcharticleFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addarticleDataSuccess, (state, { newData }) => {
    return { ...state, articleData: [newData, ...state.articleData], error: null };
  }),

  on(uploadImageSuccess, (state, { newData }) => {
    console.log("newData ", newData);
    return { ...state, articleData: [newData, ...state.articleData], error: null };
  }),

  on(updatearticleDataSuccess, (state, { updatedData }) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      articleData: state.articleData.map((articledata) => articledata.id === updatedData.id ? updatedData : articledata),
      error: null
    };
  }),

  on(deletearticleSuccess, (state, { id }) => {
    const updatedlist = state.articleData.filter((articledata) => !id.includes(articledata.id));
    console.log("updatedlist ", updatedlist);
    return { ...state, articleData: updatedlist, error: null };
  }),

  on(deleteFavoriteArticleSuccess, (state, { id }) => {
    const updatedlist = state.articleData.map((articledata) => 
      articledata.id == id ? { ...articledata, favorite: false } : articledata
    );
    return { ...state, articleData: updatedlist, error: null };
  }),

  on(deleteFavoriteArticleFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(addfavoriteByArticleDataSuccess, (state, { newData }) => {
    const updatedlist = state.articleData.map((articledata) => 
      articledata.id == newData.article.id ? { ...articledata, favorite: true } : articledata
    );
    return { ...state, articleData: updatedlist, error: null };
  }),

  on(fetchSingleArticleData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(fetchSingleArticleSuccess, (state, { fetchedSingleArticleData }) => {
    console.log("fetchedSingleArticleData ", fetchedSingleArticleData);
    return { ...state, article: fetchedSingleArticleData, loading: false };
  }),

  on(fetchSingleArticleFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(searcharticleData, (state) => {
    return { ...state, loading: true, error: null };
  }),

  on(searcharticleSuccess, (state, { fetchedArticleData }) => {
    console.log("search article data ", fetchedArticleData);
    return { ...state, articleData: fetchedArticleData, loading: false };
  }),

  on(searcharticleFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  })

)


// Selector
export function reducer(state: ArticleState | undefined, action: Action) {
  return ArticleReducer(state, action);
}
