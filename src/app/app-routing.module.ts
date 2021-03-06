import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBasedPreloader, Role, AuthGuard, NoAuthGuard } from './core/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'starships',
    pathMatch: 'full',
  },
  {
    path: 'starships',
    loadChildren: () => import('./features/starships/starships.module').then((m) => m.StarshipsModule),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./features/sign-in/sign-in.module').then((m) => m.SignInModule),
    canActivate: [NoAuthGuard],
    data: { preloadIfRole: 'user' as Role },
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
    data: { preloadIfRole: 'client' as Role },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: RoleBasedPreloader,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
