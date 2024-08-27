import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { errorsInterceptor } from './shared/Interceptors/errors.interceptor';
import { headersetInterceptor } from './shared/Interceptors/headerset.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),provideAnimations(), // required animations providers
    provideToastr(), provideClientHydration() ,provideHttpClient(withInterceptors([errorsInterceptor,headersetInterceptor]),withFetch()),provideAnimations(), RouterModule,BrowserAnimationsModule]
};
