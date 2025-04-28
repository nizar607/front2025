import {Action, createReducer, on} from '@ngrx/store';
import {
  addcategoryDataSuccess,
  deletecategorySuccess,
  fetchcategoryData,
  fetchcategoryFailure,
  fetchcategorySuccess,
  updatecategoryDataSuccess,
  uploadImageSuccess
} from './category.action';


export interface CategoryState {
  categoryData: any[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  categoryData: [],
  loading: false,
  error: null
};

export const CategoryReducer = createReducer(
  initialState,
  on(fetchcategoryData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchcategorySuccess, (state, {fetchedCategoryData}) => {
    return {...state, categoryData:fetchedCategoryData, loading: false};
  }),

  on(fetchcategoryFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addcategoryDataSuccess, (state, {newData}) => {
    return {...state, categoryData: [newData, ...state.categoryData], error: null};
  }),

  on(uploadImageSuccess, (state, {newData}) => {
    console.log("newData ", newData);
    return {...state, categoryData: [newData, ...state.categoryData], error: null};
  }),

  on(updatecategoryDataSuccess, (state, {updatedData}) => {
    console.log("updatedData ", updatedData);
    return {
      ...state,
      categoryData: state.categoryData.map((categorydata) => categorydata.id === updatedData.id ? updatedData : categorydata),
      error: null
    };
  }),

  on(deletecategorySuccess, (state, {id}) => {
    const updatedlist = state.categoryData.filter((categorydata) => !id.includes(categorydata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, categoryData: updatedlist, error: null};
  }),
)

// Selector
export function reducer(state: CategoryState | undefined, action: Action) {
  return CategoryReducer(state, action);
}
