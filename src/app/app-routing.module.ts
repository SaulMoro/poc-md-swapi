import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBasedPreloader } from './core/auth';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: RoleBasedPreloader,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
