import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as PeopleApiActions from './people-api.actions';
import { PeopleService } from '../services/people.service';

@Injectable()
export class PeopleEffects {
  // TODO: Add effect to dispatch loadPeopleFromIdsStart on loadStarshipSuccess filtering already loaded people

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

  constructor(private actions$: Actions, private peopleService: PeopleService) {}
}
