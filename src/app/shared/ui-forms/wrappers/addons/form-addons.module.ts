import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { FormAddonsComponent } from './form-addons.component';
import { addonsExtension } from './form-addons.extension';

@NgModule({
  declarations: [FormAddonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgIconsModule,
    FormlyModule.forChild({
      wrappers: [{ name: 'addons', component: FormAddonsComponent }],
      extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
    }),
  ],
})
export class FormAddonsModule {}
