import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Observable, map } from 'rxjs';
import { Option } from '../shared/models/option.model';
import { ScheduleService } from '../services/schedule.service';
import { TeacherSubject } from '../models/teacher-subject.entity';

export const teachersSubjectsResolver: ResolveFn<
  Observable<TeacherSubject[]>
> = (route, state) => {
  const $schedule = inject(ScheduleService);
  return $schedule.getTeacherSubject();
};
