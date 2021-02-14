import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { StarshipsApiActions } from '@md-starwars/shared/data-access-starships';
import { extractIdFromUrl } from '@md-starwars/shared/utils';
import * as FilmsApiActions from './films-api.actions';
import * as FilmsSelectors from './films.selectors';
import { FilmsService } from '../services/films.service';

@Injectable()
export class FilmsEffects {
  loadFilmsFromIdsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsApiActions.loadStarshipSuccess),
      concatLatestFrom(() => this.store.select(FilmsSelectors.selectFilmEntities)),
      map(([{ starship }, filmEntities]) => {
        const filmIds = starship.films.map(extractIdFromUrl);
        return filmIds.filter((id) => !filmEntities[id]);
      }),
      filter((filmIds) => !!filmIds.length),
      map((filmIds) => FilmsApiActions.loadFilmsFromIdsStart({ filmIds })),
    ),
  );

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

  constructor(private actions$: Actions, private store: Store, private filmsService: FilmsService) {}
}
