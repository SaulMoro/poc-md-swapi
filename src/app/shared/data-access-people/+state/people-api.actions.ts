import { createAction, props } from '@ngrx/store';
import { People } from '../models';

export const loadPeopleFromIdsStart = createAction(
  '[People Api] Load People From Ids Start',
  props<{ peopleIds: number[] }>(),
);
export const loadPeopleFromIdsSuccess = createAction(
  '[People Api] Load People From Ids Success',
  props<{ people: People[] }>(),
);
export const loadPeopleFromIdsFailure = createAction(
  '[People Api] Load People From Ids Failure',
  props<{ error: any }>(),
);
