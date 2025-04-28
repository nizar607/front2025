import {createAction, props} from '@ngrx/store';
import {MapModel} from './map.model';
import * as L from 'leaflet';

// fetch map data
export const fetchMapData = createAction('[Data] Fetch map Table Data');
export const fetchMapSuccess = createAction('[Data] Fetch map Data Success', props<{ mapData: MapModel[] }>());
export const fetchMapFailure = createAction('[Data] Fetch map Data Failure', props<{ error: string }>());

export const fetchSelectedMapData = createAction('[Data] Fetch selected map Data');

export const fetchSelectedMapSuccess = createAction('[Data] Fetch selected map Data Success', props<{
  selectedMapData: MapModel
}>());

export const setSelectedMapData = createAction('[Data] Set selected map Data', props<{ selectedMapData: MapModel }>());

export const setMap = createAction('[Data] set initial map Data', props<{ map: any }>());

export const setMapData = createAction('[Data] Set map Data', props<{ mapData: any }>());


export const fetchSelectedMapFailure = createAction('[Data] Fetch selected map Data Failure', props<{
  error: string
}>());

// Add Data
export const addMapData = createAction(
  '[Data] Add mapData',
  props<{ newData: FormData }>()
);


export const addMapDataSuccess = createAction(
  '[Data] Add mapData Success',
  props<{ newData: any }>()
);

export const addMapDataFailure = createAction(
  '[Data] Add mapData Failure',
  props<{ error: string }>()
);


// Update Data
export const updateMapData = createAction(
  '[Data] Update mapData',
  props<{ updatedData: FormData }>()
);

export const updateMapDataSuccess = createAction(
  '[Data] Update mapData Success',
  props<{ updatedData: MapModel }>()
);

export const updateMapDataFailure = createAction(
  '[Data] Update mapData Failure',
  props<{ error: string }>()
);

// Delete Data
export const deleteMapData = createAction(
  '[Data] Delete mapData',
  props<{ id: string }>()
);

export const deleteMapSuccess = createAction(
  '[Data] Delete mapData Success',
  props<{ id: string }>()
);
export const deleteMapFailure = createAction(
  '[Data] Delete mapData Failure',
  props<{ error: string }>()
);
