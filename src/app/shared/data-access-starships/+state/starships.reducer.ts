import { ActionReducer, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { DataState, LoadingState } from '@md-starwars/shared/models';
import * as StarshipsApiActions from './starships-api.actions';
import { Starship, selectStarshipId } from '../models';

export const STARSHIPS_FEATURE_KEY = 'starships';

export interface StarshipsState extends EntityState<Starship> {
  dataState: DataState;
}

export const starshipsAdapter = createEntityAdapter<Starship>({
  selectId: selectStarshipId,
});

export const initialState: StarshipsState = starshipsAdapter.getInitialState({
  dataState: LoadingState.INIT,
});

export const starshipsReducer = createReducer(
  initialState,
  on(StarshipsApiActions.loadStarshipsFromIdsStart, (state) => ({ ...state, dataState: LoadingState.LOADING })),
  on(StarshipsApiActions.loadStarshipsFromIdsSuccess, (state, { starships }) =>
    starshipsAdapter.addMany(starships, { ...state, dataState: LoadingState.LOADED }),
  ),
  on(StarshipsApiActions.loadStarshipsFromIdsFailure, (state, { error }) => ({ ...state, dataState: { error } })),
);

export const localStorageSyncStarshipsMetaReducer = (
  reducer: ActionReducer<ReturnType<typeof starshipsReducer>>,
): ActionReducer<ReturnType<typeof starshipsReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `MD_${STARSHIPS_FEATURE_KEY}_${key}`,
  })(reducer);
