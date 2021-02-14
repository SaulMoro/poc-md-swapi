import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { StarshipsApiActions } from '@md-starwars/shared/data-access-starships';
import { extractIdFromUrl } from '@md-starwars/shared/utils';
import * as PeopleApiActions from './people-api.actions';
import * as PeopleSelectors from './people.selectors';
import { PeopleService } from '../services/people.service';

@Injectable()
export class PeopleEffects {
  loadPeopleFromIdsStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StarshipsApiActions.loadStarshipSuccess),
      concatLatestFrom(() => this.store.select(PeopleSelectors.selectPeopleEntities)),
      map(([{ starship }, peopleEntities]) => {
        const peopleIds = starship.pilots.map(extractIdFromUrl);
        return peopleIds.filter((id) => !peopleEntities[id]);
      }),
      filter((peopleIds) => !!peopleIds.length),
      map((peopleIds) => PeopleApiActions.loadPeopleFromIdsStart({ peopleIds })),
    ),
  );

  loadPeopleFromIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleApiActions.loadPeopleFromIdsStart),
      switchMap(({ peopleIds }) =>
        forkJoin(peopleIds.map((id) => this.peopleService.getPeople(id))).pipe(
          map((people) => PeopleApiActions.loadPeopleFromIdsSuccess({ people })),
          catchError((error: unknown) => of(PeopleApiActions.loadPeopleFromIdsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private store: Store, private peopleService: PeopleService) {}
}
