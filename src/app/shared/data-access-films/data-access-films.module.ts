import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  FILMS_FEATURE_KEY,
  filmsReducer,
  initialState,
  localStorageSyncFilmsMetaReducer,
} from './+state/films.reducer';
import { FilmsEffects } from './+state/films.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FILMS_FEATURE_KEY, filmsReducer, {
      initialState,
      metaReducers: [localStorageSyncFilmsMetaReducer],
    }),
    EffectsModule.forFeature([FilmsEffects]),
  ],
})
export class DataAccessFilmsModule {}
