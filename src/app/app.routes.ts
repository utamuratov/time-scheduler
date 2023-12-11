import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '1' },
  {
    path: ':groupId',
    loadComponent: () =>
      import('./make-schedule/make-schedule.component').then(
        (m) => m.MakeScheduleComponent
      ),
  },
];
