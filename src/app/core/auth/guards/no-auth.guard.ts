import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAuthenticated } from '../+state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    // eslint-disable-next-line ngrx/avoid-mapping-selectors
    return this.store.select(selectAuthenticated).pipe(map((authenticated) => !authenticated));
  }
}
