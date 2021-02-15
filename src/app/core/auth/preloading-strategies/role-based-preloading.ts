import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { selectRoles } from '../+state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class RoleBasedPreloader implements PreloadingStrategy {
  constructor(private store: Store) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const requiredRole = route.data?.['preloadIfRole'];

    if (requiredRole) {
      return this.store.select(selectRoles).pipe(
        concatMap((roles) => {
          if (roles.some((r) => r === requiredRole)) {
            // The user has the required role, load the module
            return load();
          }
          // The user doesn't have the required role, ignore the module
          return of(null);
        }),
      );
    }
    // The route doesn't have a required role, load the module
    return load();
  }
}
