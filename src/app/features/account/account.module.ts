import { NgModule } from '@angular/core';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './containers/account/account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [SharedModule, AccountRoutingModule],
})
export class AccountModule {}
