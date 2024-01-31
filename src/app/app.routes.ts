import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'make-schedule/1' },
  {
    path: 'make-schedule/:groupId',
    loadComponent: () =>
      import('./containers/make-schedule/make-schedule.component').then(
        (m) => m.MakeScheduleComponent
      ),
  },
  {
    path: 'subject',
    loadComponent: () =>
      import('./containers/subject/subject.component').then(
        (m) => m.SubjectComponent
      ),
  },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./containers/teacher/teacher.component').then(
        (m) => m.TeacherComponent
      ),
  },
  {
    path: 'room',
    loadComponent: () =>
      import('./containers/room/room.component').then((m) => m.RoomComponent),
  },
];
