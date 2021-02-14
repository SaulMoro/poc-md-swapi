import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  PEOPLE_FEATURE_KEY,
  peopleReducer,
  initialState,
  localStorageSyncPeopleMetaReducer,
} from './+state/people.reducer';
import { PeopleEffects } from './+state/people.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(PEOPLE_FEATURE_KEY, peopleReducer, {
      initialState,
      metaReducers: [localStorageSyncPeopleMetaReducer],
    }),
    EffectsModule.forFeature([PeopleEffects]),
  ],
})
export class DataAccessPeopleModule {}
