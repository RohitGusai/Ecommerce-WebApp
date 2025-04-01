import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// import { tokenHttpInterceptor } from './core/token-http-interceptor';
import { tokenHttpInterceptor } from './core/token-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([tokenHttpInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideAnimationsAsync()]
};
