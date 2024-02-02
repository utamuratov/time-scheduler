import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Observable, map } from 'rxjs';
import { Option } from '../shared/models/option.model';

export const teacherResolver: ResolveFn<Observable<Option[]>> = (
  route,
  state
) => {
  const $general = inject(GeneralService);
  return $general.getTeachers().pipe(
    map((teachers) =>
      teachers.map((teacher) => {
        return {
          label: `${teacher.firstName} ${teacher.lastName}`,
          value: teacher.id,
        };
      })
    )
  );
};
