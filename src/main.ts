import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@md-starwars/app.module';
import { environment } from '@md-starwars/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
