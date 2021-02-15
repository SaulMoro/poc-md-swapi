import { provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';

import { AuthSelectors } from '@md-starwars/core/auth';
import { LazyLoginComponent } from './lazy-login.component';

test('renders the component', async () => {
  await render(LazyLoginComponent, {
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
