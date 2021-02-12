import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

// Shared Data Access
// ...

import { UiFormsModule } from './ui-forms';
import { PrefetchDirective } from './directives/prefetch.directive';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { AutofocusDirective } from './directives/autofocus.directive';

const EXPORTED_DECLARATIONS = [PrefetchDirective, LazyImgDirective, AutofocusDirective];

const IMPORTED_EXPORTS = [CommonModule, UiFormsModule, TranslocoModule];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [...IMPORTED_EXPORTS, RouterModule],
  exports: [...IMPORTED_EXPORTS, ...EXPORTED_DECLARATIONS],
})
export class SharedModule {}
