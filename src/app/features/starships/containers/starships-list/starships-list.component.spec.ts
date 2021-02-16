import { provideMockStore } from '@ngrx/store/testing';
import { render, screen } from '@testing-library/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { StarshipsListComponent } from './starships-list.component';
import { StarshipItemListComponent } from '../../components/starship-item-list/starship-item-list.component';

test('renders the component', async () => {
  await render(StarshipsListComponent, {
    imports: [
      HttpClientModule,
      RouterTestingModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot(),
      SvgIconsModule.forRoot(),
      InfiniteScrollModule,
      SharedModule,
    ],
    providers: [provideMockStore()],
    declarations: [StarshipItemListComponent],
  });

  expect(screen).toBeTruthy();
});
