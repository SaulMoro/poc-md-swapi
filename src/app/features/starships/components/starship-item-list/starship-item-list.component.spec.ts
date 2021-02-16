import { render, screen } from '@testing-library/angular';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from '@md-starwars/shared/shared.icons';
import { StarshipItemListComponent } from './starship-item-list.component';

test('renders the component', async () => {
  await render(StarshipItemListComponent, {
    imports: [SvgIconsModule.forRoot({ icons })],
    providers: [],
  });

  expect(screen).toBeTruthy();
});
