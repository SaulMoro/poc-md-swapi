import { ActionReducer, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { DataState, LoadingState } from '@md-starwars/shared/models';
import * as StarshipsApiActions from './starships-api.actions';
import { Starship, selectStarshipId } from '../models';
import { getStarshipDetailsExpirationFromNow, getStarshipListExpirationFromNow } from '../utils/dates.util';

export const STARSHIPS_FEATURE_KEY = 'starships';

export interface StarshipsState extends EntityState<Starship> {
  dataState: DataState;
  currentPage: number;
  totalStarships: number;
  loadedPagesExpiration: {
    [page: number]: string; // date in ISO format with expiration of ship page
  };
  loadedDetailsExpiration: {
    [id: number]: string; // date in ISO format with expiration of ship details
  };
}

export const starshipsAdapter = createEntityAdapter<Starship>({
  selectId: selectStarshipId,
  sortComparer: (s1, s2) => selectStarshipId(s1) - selectStarshipId(s2),
});

export const initialState: StarshipsState = starshipsAdapter.getInitialState({
  dataState: LoadingState.INIT,
  currentPage: 1,
  totalStarships: 0,
  loadedPagesExpiration: {},
  loadedDetailsExpiration: {},
});

export const starshipsReducer = createReducer(
  initialState,
  on(StarshipsApiActions.loadStarshipsPageStart, (state, { page }) => ({
    ...state,
    dataState: state.loadedPagesExpiration[page] ? LoadingState.REFRESHING : LoadingState.LOADING,
  })),
  on(StarshipsApiActions.loadStarshipsPageSuccess, (state, { page, starships, totalStarships }) =>
    starshipsAdapter.addMany(starships, {
      ...state,
      currentPage: page,
      totalStarships,
      loadedPagesExpiration: { ...state.loadedPagesExpiration, [page]: getStarshipListExpirationFromNow() },
      dataState: LoadingState.LOADED,
    }),
  ),

  on(StarshipsApiActions.loadStarshipStart, (state, { starshipId }) => ({
    ...state,
    dataState:
      state.loadedDetailsExpiration[starshipId] || state.entities[starshipId]
        ? LoadingState.REFRESHING
        : LoadingState.LOADING,
  })),
  on(StarshipsApiActions.loadStarshipSuccess, (state, { starship }) =>
    starshipsAdapter.addOne(starship, {
      ...state,
      loadedDetailsExpiration: {
        ...state.loadedDetailsExpiration,
        [selectStarshipId(starship)]: getStarshipDetailsExpirationFromNow(),
      },
      dataState: LoadingState.LOADED,
    }),
  ),

  on(StarshipsApiActions.loadStarshipsPageFailure, StarshipsApiActions.loadStarshipFailure, (state, { error }) => ({
    ...state,
    dataState: { error },
  })),
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
