import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { icons } from './layout.icons';
import { HeaderComponent } from './header/header.component';
import { ToggleThemeComponent } from './header/toggle-theme/toggle-theme.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { FloatingSidebarComponent } from './floating-sidebar/floating-sidebar.component';

const EXPORTED_DECLARATIONS = [HeaderComponent, MainSidebarComponent, FloatingSidebarComponent];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS, ToggleThemeComponent],
  imports: [CommonModule, RouterModule, TranslocoModule, SvgIconsModule.forChild(icons)],
  exports: [...EXPORTED_DECLARATIONS],
})
export class LayoutModule {}
