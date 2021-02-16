import { provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { StarshipsListComponent } from './starships-list.component';

test('renders the component', async () => {
  await render(StarshipsListComponent, {
    imports: [HttpClientModule, StoreModule.forRoot({}), EffectsModule.forRoot(), SvgIconsModule.forRoot()],
    providers: [provideMockStore()],
  });

  expect(screen).toBeTruthy();
});
