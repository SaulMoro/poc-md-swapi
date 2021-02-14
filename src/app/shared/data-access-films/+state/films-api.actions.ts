import { createAction, props } from '@ngrx/store';
import { Film } from '../models';

export const loadFilmsFromIdsStart = createAction(
  '[Films Api] Load Films From Ids Start',
  props<{ filmIds: number[] }>(),
);
export const loadFilmsFromIdsSuccess = createAction(
  '[Films Api] Load Films From Ids Success',
  props<{ films: Film[] }>(),
);
export const loadFilmsFromIdsFailure = createAction('[Films Api] Load Films From Ids Failure', props<{ error: any }>());
