import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './mitigation.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideNativeDateAdapter(),
  ],
};
