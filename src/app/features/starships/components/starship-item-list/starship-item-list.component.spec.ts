import { render, screen } from '@testing-library/angular';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from '@md-starwars/shared/shared.icons';
import { LazyImgDirective } from '@md-starwars/shared/directives/lazy-img.directive';
import { StarshipItemListComponent } from './starship-item-list.component';

test('renders the component', async () => {
  await render(StarshipItemListComponent, {
    declarations: [LazyImgDirective],
    imports: [SvgIconsModule.forRoot({ icons })],
    providers: [],
  });

  expect(screen).toBeTruthy();
});
