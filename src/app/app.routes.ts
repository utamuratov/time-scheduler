import { Routes } from '@angular/router';
import { teacherResolver } from './resolvers/teacher.resolver';
import { subjectResolver } from './resolvers/subject.resolver';
import { roomResolver } from './resolvers/room.resolver';
import { groupResolver } from './resolvers/group.resolver';
import { teachersSubjectsResolver } from './resolvers/teacher-subject.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'subject' },
  {
    path: 'make-schedule/:groupId',
    loadComponent: () =>
      import('./containers/make-schedule/make-schedule.component').then(
        (m) => m.MakeScheduleComponent
      ),
    resolve: {
      subjects: subjectResolver,
      teachers: teacherResolver,
      teachersSubjects: teachersSubjectsResolver,
    },
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
  {
    path: 'group',
    loadComponent: () =>
      import('./containers/group/group.component').then(
        (m) => m.GroupComponent
      ),
    resolve: {
      rooms: roomResolver,
    },
  },
  {
    path: 'teacher-subject',
    loadComponent: () =>
      import('./containers/teacher-subject/teacher-subject.component').then(
        (m) => m.TeacherSubjectComponent
      ),
    resolve: {
      teachers: teacherResolver,
      subjects: subjectResolver,
    },
  },
  {
    path: 'subject-group',
    loadComponent: () =>
      import('./containers/subject-group/subject-group.component').then(
        (m) => m.SubjectGroupComponent
      ),
    resolve: {
      groups: groupResolver,
      subjects: subjectResolver,
    },
  },
];
