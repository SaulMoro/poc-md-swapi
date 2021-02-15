import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UiActions, UiSelectors } from '@md-starwars/core/ui';
import { AuthSelectors } from './core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme$ = this.store.select(UiSelectors.selectTheme);
  loggedIn$ = this.store.select(AuthSelectors.selectAuthenticated);
  sidebars$ = this.store
    .select(UiSelectors.selectSidebars)
    .pipe(tap(({ login }) => (login ? this._lazyLoadLogin() : EMPTY)));

  @ViewChild('floatingSidebarContainer', { read: ViewContainerRef }) floatingSidebarContainer!: ViewContainerRef;

  constructor(private store: Store, private factoryResolver: ComponentFactoryResolver) {}

  toggleTheme(): void {
    this.store.dispatch(UiActions.toggleTheme());
  }

  toggleMainSidebar(): void {
    this.store.dispatch(UiActions.toggleMainSidebar());
  }

  itemSelected(): void {
    this.store.dispatch(UiActions.selectItemOnMainSidebar());
  }

  closeFloatingSidebar(): void {
    this.store.dispatch(UiActions.closeFloatingSidebar());
    this.floatingSidebarContainer.clear();
  }

  login(): void {
    this.store.dispatch(UiActions.openLogin());
  }

  private async _lazyLoadLogin(): Promise<void> {
    const { LazyLoginComponent } = await import(
      /* webpackPrefetch: true */
      '@md-starwars/features/login/lazy-containers/lazy-login/lazy-login.component'
    );
    const factory = this.factoryResolver.resolveComponentFactory(LazyLoginComponent);
    this.floatingSidebarContainer.createComponent(factory);
  }
}
