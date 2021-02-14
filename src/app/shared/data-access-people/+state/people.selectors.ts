import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataState, isLoadingOrRefreshing } from '@md-starwars/shared/models';
import { PeopleState, PEOPLE_FEATURE_KEY, peopleAdapter } from './people.reducer';

export const selectPeopleState = createFeatureSelector<PeopleState>(PEOPLE_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = peopleAdapter.getSelectors();

export const selectAllPeople = createSelector(selectPeopleState, (state: PeopleState) => selectAll(state));
export const selectPeopleEntities = createSelector(selectPeopleState, (state: PeopleState) => selectEntities(state));
export const selectPeopleIds = createSelector(selectPeopleState, (state: PeopleState) => selectIds(state));

export const selectDataState = createSelector(selectPeopleState, (state: PeopleState) => state?.dataState);
export const selectLoading = createSelector(selectDataState, (state: DataState) => isLoadingOrRefreshing(state));
