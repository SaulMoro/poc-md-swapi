import { createReducer, on } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { lsTheme, mediaTheme } from './helpers';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {
  theme: 'light' | 'dark';
}

export const initialState: UiState = {
  theme: lsTheme || mediaTheme,
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.toggleTheme, (state) => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark' })),
);
