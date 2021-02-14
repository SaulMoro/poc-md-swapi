import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import * as StarshipsApiActions from './starships-api.actions';
import { StarshipsService } from '../services/starships.service';

@Injectable()
export class StarshipsEffects {
  // TODO: Add effect to dispatch loadStarshipsFromIdsStart on loadStartshipSuccess filtering already loaded starships

  loadStarshipsFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsApiActions.loadStarshipsFromIdsStart),
      switchMap(({ starshipIds }) =>
        forkJoin(starshipIds.map((id) => this.starshipsService.getStarship(id))).pipe(
          map((starships) => StarshipsApiActions.loadStarshipsFromIdsSuccess({ starships })),
          catchError((error: unknown) => of(StarshipsApiActions.loadStarshipsFromIdsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private starshipsService: StarshipsService) {}
}
