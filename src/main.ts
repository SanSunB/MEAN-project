import 'hammerjs';
// The first thing that runs in angular
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// The main line to run
// start th app.        // Start it from this module.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
