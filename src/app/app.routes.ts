import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./make-schedule/make-schedule.component').then(
        (m) => m.MakeScheduleComponent
      ),
  },
];
