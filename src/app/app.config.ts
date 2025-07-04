import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../_core/interceptors/errors.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '../_core/interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([errorInterceptor, authInterceptor])),
    provideCharts(withDefaultRegisterables()), provideAnimations()]
};
