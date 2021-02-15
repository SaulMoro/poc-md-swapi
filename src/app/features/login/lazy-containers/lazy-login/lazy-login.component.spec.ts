import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { render } from '@testing-library/angular';

import { AuthSelectors } from '@md-starwars/core/auth';
import { LazyLoginComponent } from './lazy-login.component';

test('works with provideMockStore', async () => {
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

  const store = TestBed.inject(MockStore);
  store.dispatch = jest.fn();

  /* fireEvent.click(screen.getByText(/seven/i));

  expect(store.dispatch).toBeCalledWith({ type: '[Item List] send', item: 'Seven' }); */
});
