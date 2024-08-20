import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),provideAnimations(), // required animations providers
    provideToastr(), provideClientHydration() ,provideHttpClient(withFetch()),provideAnimations(), RouterModule,BrowserAnimationsModule]
};
