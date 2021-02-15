import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';

import * as UiActions from './ui.actions';
import * as UiSelectors from './ui.selectors';
import { THEME_KEY } from './helpers';

const LG_BREAKPOINT = ['(min-width: 1024px)'];

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

  closeMainSidebarOnChangeScreenSize$ = createEffect(() =>
    this.breakpointObserver.observe(LG_BREAKPOINT).pipe(
      filter(({ matches }) => matches),
      concatLatestFrom(() => this.store.select(UiSelectors.selectMainSidebar)),
      filter(([, mainSidebar]) => mainSidebar),
      map(() => UiActions.enterLargeBreakpointWithSidebarOpen()),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
  ) {}
}
