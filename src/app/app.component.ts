import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { UiActions, UiSelectors } from '@md-starwars/core/ui';
import { sidebarAnimation } from '@md-starwars/core/animations';
import { AuthSelectors } from './core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [sidebarAnimation],
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

  login() {
    this.store.dispatch(UiActions.openLogin());
  }

  closeLogin() {
    this.store.dispatch(UiActions.closeLoginSidebar());
  }
}
