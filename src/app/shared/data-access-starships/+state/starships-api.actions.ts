import { createAction, props } from '@ngrx/store';
import { Starship } from '../models';

export const loadStarshipsPageStart = createAction(
  '[Starships Api] Load Starships Page Start',
  props<{ page: number }>(),
);
export const loadStarshipsPageSuccess = createAction(
  '[Starships Api] Load Starships Page Success',
  props<{ page: number; starships: Starship[]; totalStarships: number }>(),
);
export const loadStarshipsPageFailure = createAction(
  '[Starships Api] Load Starships Page Failure',
  props<{ error: any }>(),
);

export const loadStarshipStart = createAction('[Starships Api] Load Starship Start', props<{ starshipId: number }>());
export const loadStarshipSuccess = createAction(
  '[Starships Api] Load Starship Success',
  props<{ starship: Starship }>(),
);
export const loadStarshipFailure = createAction('[Starships Api] Load Starship Failure', props<{ error: any }>());
