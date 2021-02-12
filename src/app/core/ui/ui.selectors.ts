import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState, UI_FEATURE_KEY } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>(UI_FEATURE_KEY);

export const getTheme = createSelector(selectUiState, (state) => state?.theme);
