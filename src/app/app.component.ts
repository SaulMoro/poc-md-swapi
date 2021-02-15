import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  loggedIn$ = this.store.select(AuthSelectors.selectAuthenticated);
  sidebars$ = this.store
    .select(UiSelectors.selectSidebars)
    .pipe(tap(({ login }) => (login ? this._lazyLoadLogin() : EMPTY)));

  @ViewChild('floatingSidebarContainer', { read: ViewContainerRef }) floatingSidebarContainer!: ViewContainerRef;

  constructor(private store: Store, private factoryResolver: ComponentFactoryResolver) {}

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
    this.floatingSidebarContainer.clear();
  }

  login() {
    this.store.dispatch(UiActions.openLogin());
  }

  private async _lazyLoadLogin() {
    const { LazyLoginComponent } = await import(
      /* webpackPrefetch: true */
      '@md-starwars/features/login/lazy-containers/lazy-login/lazy-login.component'
    );
    const factory = this.factoryResolver.resolveComponentFactory(LazyLoginComponent);
    this.floatingSidebarContainer.createComponent(factory);
  }
}
