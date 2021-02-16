import { render, screen } from '@testing-library/angular';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from '@md-starwars/shared/shared.icons';
import { SharedModule } from '@md-starwars/shared/shared.module';
import { StarshipItemListComponent } from './starship-item-list.component';

test('renders the component', async () => {
  await render(StarshipItemListComponent, {
    imports: [SvgIconsModule.forRoot({ icons }), SharedModule],
    providers: [],
  });

  expect(screen).toBeTruthy();
});
