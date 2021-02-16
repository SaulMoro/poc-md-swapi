import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { authReducer, AuthState, AUTH_FEATURE_KEY } from './auth';
import { uiReducer, UiState, UI_FEATURE_KEY } from './ui';

export interface RootState {
  router: RouterReducerState;
  [UI_FEATURE_KEY]: UiState;
  [AUTH_FEATURE_KEY]: AuthState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
  [UI_FEATURE_KEY]: uiReducer,
  [AUTH_FEATURE_KEY]: authReducer,
};

export const localStorageSyncMetaReducer = (reducer: ActionReducer<RootState>): ActionReducer<RootState> =>
  localStorageSync({
    keys: [AUTH_FEATURE_KEY, { [UI_FEATURE_KEY]: [`dismissedMsgs`] }],
    rehydrate: true,
    removeOnUndefined: true,
    storageKeySerializer: (key) => `MD_${key}`,
  })(reducer);
