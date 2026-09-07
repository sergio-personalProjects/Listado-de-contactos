import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    /************************************** */
    /***SERVICIO DE CONSULTA HTTP */
    provideHttpClient() //Servicio de consulta HTTP para realizar solicitudes
    /************************************** */
  ]
};
