import { createAction, props } from '@ngrx/store';
import { Starship } from '../models';

export const loadStarshipsFromIdsStart = createAction(
  '[Starships Api] Load Starships From Ids Start',
  props<{ starshipIds: number[] }>(),
);
export const loadStarshipsFromIdsSuccess = createAction(
  '[Starships Api] Load Starships From Ids Success',
  props<{ starships: Starship[] }>(),
);
export const loadStarshipsFromIdsFailure = createAction(
  '[Starships Api] Load Starships From Ids Failure',
  props<{ error: any }>(),
);
