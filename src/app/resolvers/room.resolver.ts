import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Observable, map } from 'rxjs';
import { Option } from '../shared/models/option.model';

export const roomResolver: ResolveFn<Observable<Option[]>> = (route, state) => {
  const $general = inject(GeneralService);
  return $general.getRooms().pipe(
    map((rooms) =>
      rooms.map((room) => {
        return { label: room.name, value: room.id };
      })
    )
  );
};
