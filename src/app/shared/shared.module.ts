import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SvgIconsModule } from '@ngneat/svg-icon';

// Shared Data Access
import { DataAccessStarshipsModule } from './data-access-starships';
import { DataAccessFilmsModule } from './data-access-films';
import { DataAccessPeopleModule } from './data-access-people';

import { UiFormsModule } from './ui-forms';
import { icons } from './shared.icons';
import { PrefetchDirective } from './directives/prefetch.directive';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { AutofocusDirective } from './directives/autofocus.directive';

const EXPORTED_DECLARATIONS = [PrefetchDirective, LazyImgDirective, AutofocusDirective];

const IMPORTED_EXPORTS = [CommonModule, UiFormsModule, TranslocoModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    ...IMPORTED_EXPORTS,
    RouterModule,
    SvgIconsModule.forChild(icons),

    // Shared Data Access
    DataAccessStarshipsModule,
    DataAccessFilmsModule,
    DataAccessPeopleModule,
  ],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS, SvgIconsModule],
})
export class SharedModule {}
