import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as FilmsApiActions from './films-api.actions';
import { FilmsService } from '../services/films.service';

@Injectable()
export class FilmsEffects {
  // TODO: Add effect to dispatch loadFilmsFromIdsStart on loadStarshipSuccess filtering already loaded films

  loadFilmsFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmsApiActions.loadFilmsFromIdsStart),
      switchMap(({ filmIds }) =>
        forkJoin(filmIds.map((id) => this.filmsService.getFilm(id))).pipe(
          map((films) => FilmsApiActions.loadFilmsFromIdsSuccess({ films })),
          catchError((error: unknown) => of(FilmsApiActions.loadFilmsFromIdsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private filmsService: FilmsService) {}
}
