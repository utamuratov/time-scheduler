import { InjectionToken } from '@angular/core';

export const API_HTTP_BASE_URL = new InjectionToken<string>(
  'API_HTTP_BASE_URL'
  // * YOU CAN USE THIS INSTEAD OF PROVIDING THE VALUE IN THE APP.MODULE.TS FILE
  // * BUT YOU MAY NEED TO PROVIDE THIS TOKEN TO A SPECIFIC MODULE
  //   {
  //     providedIn: 'root',
  //     factory: () => '/api',
  //   }
);
