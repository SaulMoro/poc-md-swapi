import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@md-starwars/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { localStorageSyncMetaReducer, reducers } from './core.state';
import { UiEffects } from './ui';
import { AuthEffects, AuthTokenInterceptor } from './auth';

@NgModule({
  imports: [
    // angular
    HttpClientModule,
    TranslocoRootModule,

    // ngrx
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
      },
      metaReducers: [localStorageSyncMetaReducer],
    }),
    EffectsModule.forRoot([UiEffects, AuthEffects]),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    // third party
  ],
  exports: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
