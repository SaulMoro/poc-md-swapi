import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsListComponent } from './containers/starships-list/starships-list.component';
import { StarshipDetailsComponent } from './containers/starship-details/starship-details.component';
import { StarshipItemListComponent } from './components/starship-item-list/starship-item-list.component';

@NgModule({
  declarations: [StarshipsListComponent, StarshipDetailsComponent, StarshipItemListComponent],
  imports: [SharedModule, StarshipsRoutingModule, InfiniteScrollModule],
})
export class StarshipsModule {}
