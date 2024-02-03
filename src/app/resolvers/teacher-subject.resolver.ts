import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';
import { TeacherSubject } from '../models/teacher-subject.entity';

export const teachersSubjectsResolver: ResolveFn<
  Observable<TeacherSubject[]>
> = (route, state) => {
  const $general = inject(GeneralService);
  return $general.getTeacherSubject();
};
