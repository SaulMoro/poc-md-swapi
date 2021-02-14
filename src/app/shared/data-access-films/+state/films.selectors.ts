import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataState, isLoadingOrRefreshing } from '@md-starwars/shared/models';
import { FilmsState, FILMS_FEATURE_KEY, filmsAdapter } from './films.reducer';

export const selectFilmsState = createFeatureSelector<FilmsState>(FILMS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = filmsAdapter.getSelectors();

export const selectAllFilms = createSelector(selectFilmsState, (state: FilmsState) => selectAll(state));
export const selectFilmEntities = createSelector(selectFilmsState, (state: FilmsState) => selectEntities(state));
export const selectFilmIds = createSelector(selectFilmsState, (state: FilmsState) => selectIds(state));

export const selectDataState = createSelector(selectFilmsState, (state: FilmsState) => state?.dataState);
export const selectLoading = createSelector(selectDataState, (state: DataState) => isLoadingOrRefreshing(state));
