import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Observable, map } from 'rxjs';
import { Option } from '../shared/models/option.model';

export const subjectResolver: ResolveFn<Observable<Option[]>> = (
  route,
  state
) => {
  const $general = inject(GeneralService);
  return $general.getSubjects().pipe(
    map((data) =>
      data.map((item) => {
        return { label: item.name, value: item.id };
      })
    )
  );
};
