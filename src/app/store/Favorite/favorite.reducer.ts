import {Action, createReducer, on} from '@ngrx/store';
import {
  addfavoriteDataSuccess,
  checkIsFavoriteSuccess,
  deletefavoriteSuccess,
  fetchfavoriteByUserFailure,
  fetchfavoriteByUserSuccess,
  fetchfavoriteData,
  fetchfavoriteDataByUser,
  fetchfavoriteFailure,
  fetchfavoriteSuccess,
  updatefavoriteDataSuccess,
  uploadImageSuccess
} from './favorite.action';


export interface FavoriteState {
  favoriteData: any[];
  loading: boolean;
  favoriteStatus: { [articleId: number]: boolean };
  error: any;
}

export const initialState: FavoriteState = {
  favoriteData: [],
  loading: false,
  error: null,
  favoriteStatus: {}
};

export const FavoriteReducer = createReducer(
  initialState,
  on(fetchfavoriteData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchfavoriteSuccess, (state, {fetchedFavoriteData}) => {
    console.log("fetchedFavoriteData ", fetchedFavoriteData);
    return {...state, favoriteData:fetchedFavoriteData, loading: false};
  }),

  on(fetchfavoriteFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(checkIsFavoriteSuccess, (state, { articleId, isFavorite }) => ({
    ...state,
    favoriteStatus: {
      ...state.favoriteStatus,
      [articleId]: isFavorite
    }
  })),

  on(fetchfavoriteDataByUser, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchfavoriteByUserSuccess, (state, {fetchedFavoriteData}) => {
    console.log("fetchedFavoriteDataByUser ", fetchedFavoriteData);
    return {...state, favoriteData:fetchedFavoriteData, loading: false};
  }),

  on(fetchfavoriteByUserFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),
  
  on(addfavoriteDataSuccess, (state, {newData}) => {
    return {...state, favoriteData: [newData, ...state.favoriteData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, favoriteData: [newData, ...state.favoriteData], error: null};
  }),

  on(updatefavoriteDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      favoriteData: state.favoriteData.map((favoritedata) => favoritedata.id === updatedData.id ? updatedData : favoritedata),
      error: null
    };
  }),

  on(deletefavoriteSuccess, (state, {id}) => {
    const updatedlist = state.favoriteData.filter((favoritedata) => !id.includes(favoritedata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, favoriteData: updatedlist, error: null};
  }),
  
)

// Selector
export function reducer(state: FavoriteState | undefined, action: Action) {
  return FavoriteReducer(state, action);
}
