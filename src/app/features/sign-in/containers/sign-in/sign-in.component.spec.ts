import { provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { SignInComponent } from './sign-in.component';

test('renders the component', async () => {
  await render(SignInComponent, {
    imports: [
      HttpClientModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      SvgIconsModule.forRoot(),
      SharedModule,
    ],
    providers: [provideMockStore()],
  });

  expect(screen).toBeTruthy();
});
