import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataState, isLoadingOrRefreshing } from '@md-starwars/shared/models';
import { StarshipsState, STARSHIPS_FEATURE_KEY, starshipsAdapter } from './starships.reducer';
import { STARSHIPS_PER_PAGE } from '../models/constants';
import { RouterSelectors } from '@md-starwars/core/router';

export const selectStarshipsState = createFeatureSelector<StarshipsState>(STARSHIPS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = starshipsAdapter.getSelectors();

export const selectAllStarships = createSelector(selectStarshipsState, (state: StarshipsState) => selectAll(state));
export const selectStarshipEntities = createSelector(selectStarshipsState, (state: StarshipsState) =>
  selectEntities(state),
);
export const selectStarshipIds = createSelector(selectStarshipsState, (state: StarshipsState) => selectIds(state));

export const selectDataState = createSelector(selectStarshipsState, (state: StarshipsState) => state?.dataState);
export const selectLoading = createSelector(selectDataState, (state: DataState) => isLoadingOrRefreshing(state));

export const selectTotalStarships = createSelector(
  selectStarshipsState,
  (state: StarshipsState) => state?.totalStarships,
);
export const selectStarshipsTotalPages = createSelector(selectTotalStarships, (totalStarships: number) =>
  Math.ceil(totalStarships / STARSHIPS_PER_PAGE),
);

export const selectLoadedPagesExpiration = createSelector(
  selectStarshipsState,
  (state: StarshipsState) => state?.loadedPagesExpiration,
);
export const selectExpirationOfPage = createSelector(
  selectLoadedPagesExpiration,
  (loadedPagesExpiration: { [page: number]: string }, { page }: { page: number }) => loadedPagesExpiration?.[page],
);

export const selectLoadedDetailsExpiration = createSelector(
  selectStarshipsState,
  (state: StarshipsState) => state?.loadedDetailsExpiration,
);

export const selectCurrentPage = createSelector(RouterSelectors.selectCurrentPage, (page: string | undefined): number =>
  page ? +page : 1,
);

export const selectSelectedStarshipId = createSelector(RouterSelectors.selectParamId, (id): number => Number(id));
export const selectSelectedStarship = createSelector(
  selectSelectedStarshipId,
  selectStarshipEntities,
  (selectedId: number, starships) => starships?.[selectedId],
);
