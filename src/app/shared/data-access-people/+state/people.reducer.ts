import { ActionReducer, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { localStorageSync } from 'ngrx-store-localstorage';

import { DataState, LoadingState } from '@md-starwars/shared/models';
import * as PeopleApiActions from './people-api.actions';
import { People, selectPeopleId } from '../models';

export const PEOPLE_FEATURE_KEY = 'people';

export interface PeopleState extends EntityState<People> {
  dataState: DataState;
}

export const peopleAdapter = createEntityAdapter<People>({
  selectId: selectPeopleId,
});

export const initialState: PeopleState = peopleAdapter.getInitialState({
  dataState: LoadingState.INIT,
});

export const peopleReducer = createReducer(
  initialState,
  on(PeopleApiActions.loadPeopleFromIdsStart, (state) => ({ ...state, dataState: LoadingState.LOADING })),
  on(PeopleApiActions.loadPeopleFromIdsSuccess, (state, { people }) =>
    peopleAdapter.addMany(people, { ...state, dataState: LoadingState.LOADED }),
  ),
  on(PeopleApiActions.loadPeopleFromIdsFailure, (state, { error }) => ({ ...state, dataState: { error } })),
);

export const localStorageSyncPeopleMetaReducer = (
  reducer: ActionReducer<ReturnType<typeof peopleReducer>>,
): ActionReducer<ReturnType<typeof peopleReducer>> =>
  localStorageSync({
    keys: Object.keys(initialState),
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `MD_${PEOPLE_FEATURE_KEY}_${key}`,
  })(reducer);
