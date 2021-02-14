import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as UiActions from './ui.actions';
import * as UiSelectors from './ui.selectors';
import { THEME_KEY } from './helpers';

@Injectable()
export class UiEffects {
  changeTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UiActions.toggleTheme),
        concatLatestFrom(() => this.store.select(UiSelectors.selectTheme)),
        tap(([, theme]) => {
          this.document.body.classList.toggle('dark', theme === 'dark');
          localStorage.setItem(THEME_KEY, theme);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store: Store, @Inject(DOCUMENT) private document: Document) {}
}
