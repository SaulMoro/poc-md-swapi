import { provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { AuthSelectors } from '@md-starwars/core/auth';
import { SharedModule } from '@md-starwars/shared/shared.module';
import { LazyLoginComponent } from './lazy-login.component';

test('renders the component', async () => {
  await render(LazyLoginComponent, {
    imports: [
      HttpClientModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      SvgIconsModule.forRoot(),
      SharedModule,
    ],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: AuthSelectors.selectUser,
            value: null,
          },
          {
            selector: AuthSelectors.selectLoading,
            value: false,
          },
        ],
      }),
    ],
  });

  expect(screen).toBeTruthy();
});
