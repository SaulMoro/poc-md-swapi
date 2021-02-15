import { NgModule } from '@angular/core';

import { SharedModule } from '@md-starwars/shared/shared.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './containers/sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [SharedModule, SignInRoutingModule],
})
export class SignInModule {}
