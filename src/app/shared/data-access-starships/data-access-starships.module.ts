import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  STARSHIPS_FEATURE_KEY,
  starshipsReducer,
  initialState,
  localStorageSyncStarshipsMetaReducer,
} from './+state/starships.reducer';
import { StarshipsEffects } from './+state/starships.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(STARSHIPS_FEATURE_KEY, starshipsReducer, {
      initialState,
      metaReducers: [localStorageSyncStarshipsMetaReducer],
    }),
    EffectsModule.forFeature([StarshipsEffects]),
  ],
})
export class DataAccessStarshipsModule {}
