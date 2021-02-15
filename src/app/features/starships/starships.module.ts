import { NgModule } from '@angular/core';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';

@NgModule({
  declarations: [StarshipsComponent],
  imports: [SharedModule, StarshipsRoutingModule],
})
export class StarshipsModule {}
