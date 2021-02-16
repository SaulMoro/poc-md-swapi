import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, filter, groupBy, map, mergeMap } from 'rxjs/operators';

import * as StarshipsActions from './starships.actions';
import * as StarshipsApiActions from './starships-api.actions';
import * as StarshipsSelectors from './starships.selectors';
import { StarshipsService } from '../services/starships.service';
import { dateInISOIsExpired } from '../utils/dates.util';

@Injectable()
export class StarshipsEffects {
  loadStarshipsPageStart$ = createEffect(() =>
    merge(
      this.actions$.pipe(
        ofType(StarshipsActions.enterStarshipsPage),
        map(() => ({ page: 1 })),
      ),
      this.actions$.pipe(
        ofType(StarshipsActions.scrollToNextStarshipsPage),
        concatLatestFrom(() => [
          this.store.select(StarshipsSelectors.selectCurrentPage),
          this.store.select(StarshipsSelectors.selectStarshipsTotalPages),
        ]),
        filter(([, page, pages]) => page < pages),
        map(([, page]) => ({ page: page + 1 })),
      ),
    ).pipe(
      concatLatestFrom(({ page }) => this.store.select(StarshipsSelectors.selectExpirationOfPage, { page })),
      filter(([, expirationOfPage]) => !expirationOfPage || dateInISOIsExpired(expirationOfPage)),
      map(([{ page }]) => StarshipsApiActions.loadStarshipsPageStart({ page })),
    ),
  );

  loadStarshipsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsApiActions.loadStarshipsPageStart),
      groupBy(({ page }) => page),
      // Can load multiple pages at same time
      mergeMap((groups) =>
        groups.pipe(
          // Avoid multiple calls in parallel to the same page
          exhaustMap(({ page }) =>
            this.starshipsService.getStarships(page).pipe(
              map(({ count, results }) =>
                StarshipsApiActions.loadStarshipsPageSuccess({ page, starships: results, totalStarships: count }),
              ),
              catchError((error: unknown) => of(StarshipsApiActions.loadStarshipsPageFailure({ error }))),
            ),
          ),
        ),
      ),
    ),
  );

  loadStarshipStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsActions.enterStarshipDetailsPage),
      concatLatestFrom(() => [
        this.store.select(StarshipsSelectors.selectSelectedStarshipId),
        this.store.select(StarshipsSelectors.selectLoadedDetailsExpiration),
      ]),
      filter(
        ([, starshipId, loadedDetailsExpiration]) =>
          !loadedDetailsExpiration[starshipId] || dateInISOIsExpired(loadedDetailsExpiration[starshipId]),
      ),
      map(([, starshipId]) => StarshipsApiActions.loadStarshipStart({ starshipId })),
    ),
  );

  loadStarshipDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsApiActions.loadStarshipStart),
      groupBy(({ starshipId }) => starshipId),
      // Can load multiple starships at same time
      mergeMap((groups) =>
        groups.pipe(
          // Avoid multiple calls in parallel to the same starship
          exhaustMap(({ starshipId }) =>
            this.starshipsService.getStarship(starshipId).pipe(
              map((starship) => StarshipsApiActions.loadStarshipSuccess({ starship })),
              catchError((error: unknown) => of(StarshipsApiActions.loadStarshipFailure({ error }))),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private store: Store, private starshipsService: StarshipsService) {}
}
