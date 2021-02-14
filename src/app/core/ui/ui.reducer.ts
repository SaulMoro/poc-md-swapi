import { createReducer, on } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { lsTheme, mediaTheme } from './helpers';
import { AuthActions, AuthApiActions } from '../auth';

export const UI_FEATURE_KEY = 'ui';

export interface UiState {
  theme: 'light' | 'dark';
  sidebars: {
    main: boolean;
    login: boolean;
  };
}

export const initialState: UiState = {
  theme: lsTheme || mediaTheme,
  sidebars: {
    main: false,
    login: false,
  },
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.toggleTheme, (state) => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark' })),

  on(UiActions.toggleMainSidebar, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, main: !state.sidebars.main },
  })),
  on(UiActions.selectItemOnMainSidebar, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, main: false },
  })),

  on(UiActions.openLogin, AuthApiActions.signInSuccess, AuthActions.unauthorized, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, login: true },
  })),
  on(UiActions.closeLoginSidebar, AuthApiActions.loginSuccess, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, login: false },
  })),
);
