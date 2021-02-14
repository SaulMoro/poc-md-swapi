import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataState, isLoadingOrRefreshing } from '@md-starwars/shared/models';
import { StarshipsState, STARSHIPS_FEATURE_KEY, starshipsAdapter } from './starships.reducer';

export const selectStarshipsState = createFeatureSelector<StarshipsState>(STARSHIPS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = starshipsAdapter.getSelectors();

export const selectAllStarships = createSelector(selectStarshipsState, (state: StarshipsState) => selectAll(state));
export const selectStarshipEntities = createSelector(selectStarshipsState, (state: StarshipsState) =>
  selectEntities(state),
);
export const selectStarshipIds = createSelector(selectStarshipsState, (state: StarshipsState) => selectIds(state));

export const selectDataState = createSelector(selectStarshipsState, (state: StarshipsState) => state?.dataState);
export const selectLoading = createSelector(selectDataState, (state: DataState) => isLoadingOrRefreshing(state));
