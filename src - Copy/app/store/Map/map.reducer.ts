import {Action, createReducer, on} from '@ngrx/store';
import {
  addMapDataSuccess,
  deleteMapSuccess,
  fetchMapData,
  fetchMapFailure,
  fetchMapSuccess,
  fetchSelectedMapData,
  fetchSelectedMapFailure,
  fetchSelectedMapSuccess, setMap,
  setMapData,
  setSelectedMapData,
  updateMapDataSuccess,
} from './map.action';

import * as L from 'leaflet';
import 'leaflet-control-geocoder';


export interface MapState {
  mapData: any[];
  selectedMapData: any;
  markers: L.Marker[];
  loading: boolean;
  error: any;
}

export const initialState: MapState = {
  markers: [],
  mapData: [],
  selectedMapData: null,
  loading: false,
  error: null
};

export const MapReducer = createReducer(
  initialState,
  on(fetchMapData, (state) => {
    return {...state, loading: true, error: null};
  }),
  on(fetchMapSuccess, (state, {mapData}) => {
    return {...state, mapData, loading: false};
  }),

  on(fetchSelectedMapData, (state) => {
    return {...state, loading: true, error: null};
  }),

  on(fetchSelectedMapSuccess, (state, {selectedMapData}) => {
    return {...state, selectedMapData: selectedMapData, loading: false, error: null};
  }),

  on(fetchSelectedMapFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(setMapData, (state, {mapData}) => {
    return {...state, mapData: mapData, error: null, loading: false};
  }),

  on(setMap, (state, {map}) => {
    return {...state, map: map, error: null, loading: false};
  }),

  on(setSelectedMapData, (state, {selectedMapData}) => {
    return {...state, selectedMapData: selectedMapData, loading: false, error: null};
  }),

  on(fetchMapFailure, (state, {error}) => {
    return {...state, error, loading: false};
  }),

  on(addMapDataSuccess, (state, {newData}) => {
    return {...state, mapData: [newData, ...state.mapData], error: null};
  }),


  /*
  on(updateMapDataSuccess, (state, {updatedData}) => {
    return {
      ...state,
      mapdata: state.mapData.map((mapdata) => mapdata.id === updatedData.id ? updatedData : mapdata),
      error: null
    };
  }),
   */

  on(deleteMapSuccess, (state, {id}) => {
    const updatedlist = state.mapData.filter((mapdata) => !id.includes(mapdata.id));
    console.log("updatedlist ", updatedlist);
    return {...state, mapData: updatedlist, error: null};
  }),
)

// Selector
export function reducer(state: MapState | undefined, action: Action) {
  return MapReducer(state, action);
}
