import { ActionReducer, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { DataState, LoadingState } from '@md-starwars/shared/models';
import * as FilmsApiActions from './films-api.actions';
import { Film, selectFilmId } from '../models';

export const FILMS_FEATURE_KEY = 'films';

export interface FilmsState extends EntityState<Film> {
  dataState: DataState;
}

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: selectFilmId,
});

export const initialState: FilmsState = filmsAdapter.getInitialState({
  dataState: LoadingState.INIT,
});

export const filmsReducer = createReducer(
  initialState,
  on(FilmsApiActions.loadFilmsFromIdsStart, (state) => ({ ...state, dataState: LoadingState.LOADING })),
  on(FilmsApiActions.loadFilmsFromIdsSuccess, (state, { films }) =>
    filmsAdapter.addMany(films, { ...state, dataState: LoadingState.LOADED }),
  ),
  on(FilmsApiActions.loadFilmsFromIdsFailure, (state, { error }) => ({ ...state, dataState: { error } })),
);

export const localStorageSyncFilmsMetaReducer = (
  reducer: ActionReducer<ReturnType<typeof filmsReducer>>,
): ActionReducer<ReturnType<typeof filmsReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `MD_${FILMS_FEATURE_KEY}_${key}`,
  })(reducer);
