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
  dismissedMsgs: {
    cookies: boolean;
  };
}

export const initialState: UiState = {
  theme: lsTheme || mediaTheme,
  sidebars: {
    main: false,
    login: false,
  },
  dismissedMsgs: {
    cookies: false,
  },
};

export const uiReducer = createReducer(
  initialState,
  on(UiActions.toggleTheme, (state) => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark' })),

  on(UiActions.toggleMainSidebar, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, main: !state.sidebars.main },
  })),
  on(UiActions.selectItemOnMainSidebar, UiActions.enterLargeBreakpointWithSidebarOpen, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, main: false },
  })),

  on(
    UiActions.openLogin,
    AuthApiActions.signInSuccess,
    AuthActions.unauthorized,
    AuthActions.loginOnSignInPage,
    (state) => ({
      ...state,
      sidebars: { ...state.sidebars, login: true },
    }),
  ),
  on(UiActions.closeFloatingSidebar, AuthApiActions.loginSuccess, AuthActions.enterSignInPage, (state) => ({
    ...state,
    sidebars: { ...state.sidebars, login: false },
  })),

  on(UiActions.dismissCookieBanner, (state) => ({
    ...state,
    dismissedMsgs: { ...state.dismissedMsgs, cookies: true },
  })),
);
