import { render, screen } from '@testing-library/angular';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from '@md-starwars/shared/shared.icons';
import { LazyImgDirective } from '@md-starwars/shared/directives/lazy-img.directive';
import { ship } from '@md-starwars/mocks/starships/ship-2.data';
import { StarshipItemListComponent } from './starship-item-list.component';

test('renders the component', async () => {
  await render(StarshipItemListComponent, {
    declarations: [LazyImgDirective],
    imports: [SvgIconsModule.forRoot({ icons })],
    providers: [],
    componentProperties: {
      starship: ship,
    },
  });

  expect(screen).toBeTruthy();
});
