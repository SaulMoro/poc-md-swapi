import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions, AuthSelectors } from '@md-starwars/core/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
