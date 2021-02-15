import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';

import { SharedModule } from '@md-starwars/shared/shared.module';

@Component({
  selector: 'app-lazy-login',
  templateUrl: './lazy-login.component.html',
  styleUrls: ['./lazy-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoginComponent {}

@NgModule({
  imports: [SharedModule],
  declarations: [LazyLoginComponent],
})
export class LazyLoginComponentModule {}
