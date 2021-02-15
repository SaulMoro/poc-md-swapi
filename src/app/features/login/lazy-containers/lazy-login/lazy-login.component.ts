import { Component, ChangeDetectionStrategy, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AuthActions, AuthSelectors, User } from '@md-starwars/core/auth';
import { SharedModule } from '@md-starwars/shared/shared.module';
import { loginForm } from '../../forms/login.form';

@Component({
  selector: 'app-lazy-login',
  templateUrl: './lazy-login.component.html',
  styleUrls: ['./lazy-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoginComponent implements OnInit {
  user$ = this.store.select(AuthSelectors.selectUser);
  loading$ = this.store
    .select(AuthSelectors.selectLoading)
    .pipe(tap((loading) => (loading ? this.form.disable() : this.form.enable())));
  error$ = this.store.select(AuthSelectors.selectError);

  form: FormGroup = new FormGroup({});
  loginForm = loginForm();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.enterLoginSidebar());
  }

  login(user: User) {
    this.store.dispatch(AuthActions.login({ user }));
  }
}

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [LazyLoginComponent],
})
export class LazyLoginComponentModule {}
