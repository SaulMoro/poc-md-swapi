import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { UiActions, UiSelectors } from '@md-starwars/core/ui';
import { AuthSelectors } from './core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  theme$ = this.store.select(UiSelectors.selectTheme);
  sidebars$ = this.store.select(UiSelectors.selectSidebars);
  loggedIn$ = this.store.select(AuthSelectors.selectAuthenticated);

  constructor(private store: Store) {}

  toggleTheme() {
    this.store.dispatch(UiActions.toggleTheme());
  }

  toggleMainSidebar() {
    this.store.dispatch(UiActions.toggleMainSidebar());
  }

  itemSelected() {
    this.store.dispatch(UiActions.selectItemOnMainSidebar());
  }

  closeFloatingSidebar() {
    this.store.dispatch(UiActions.closeFloatingSidebar());
  }

  login() {
    this.store.dispatch(UiActions.openLogin());
  }
}
