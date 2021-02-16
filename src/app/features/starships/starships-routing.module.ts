import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsListComponent } from './containers/starships-list/starships-list.component';
import { StarshipDetailsComponent } from './containers/starship-details/starship-details.component';

const routes: Routes = [
  { path: '', component: StarshipsListComponent },
  { path: ':id', component: StarshipDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarshipsRoutingModule {}
