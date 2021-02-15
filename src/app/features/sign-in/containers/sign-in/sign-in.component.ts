import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AuthActions, AuthSelectors, User } from '@md-starwars/core/auth';
import { signInForm } from '../../forms/sign-in.form';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  user$ = this.store.select(AuthSelectors.selectUser);
  loading$ = this.store
    .select(AuthSelectors.selectLoading)
    .pipe(tap((loading) => (loading ? this.form.disable() : this.form.enable())));
  error$ = this.store.select(AuthSelectors.selectError);

  form: FormGroup = new FormGroup({});
  signInForm = signInForm();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.enterSignInPage());
  }

  signIn(user: User) {
    this.store.dispatch(AuthActions.signIn({ user }));
  }

  login() {
    this.store.dispatch(AuthActions.loginOnSignInPage());
  }
}
