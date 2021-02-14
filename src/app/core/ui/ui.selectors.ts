import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState, UI_FEATURE_KEY } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const selectTheme = createSelector(selectUiState, (state) => state.theme);

export const selectSidebars = createSelector(selectUiState, (state) => state.sidebars);

export const selectMainSidebar = createSelector(selectSidebars, (sidebars) => sidebars.main);

export const selectLoginSidebar = createSelector(selectSidebars, (sidebars) => sidebars.login);
