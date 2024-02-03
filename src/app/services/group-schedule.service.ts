import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { GroupSchedules } from '../models/schedule.entity';
import { ApiHttpService } from './api-http/api-http.service';
import { GeneralService } from './general.service';

@Injectable({ providedIn: 'root' })
export class GroupSchedulesService {
  constructor(
    protected apiHttp: ApiHttpService,
    private $general: GeneralService
  ) {}

  delete(groupId: number) {
    return this.apiHttp.delete<GroupSchedules>(`groupSchedules/${groupId}`);
  }

  create(groupSchedules: GroupSchedules) {
    return this.apiHttp.post<GroupSchedules>(`groupSchedules`, groupSchedules);
  }

  update(groupSchedules: GroupSchedules) {
    return this.apiHttp.put<GroupSchedules>(
      `groupSchedules/${groupSchedules.id}`,
      groupSchedules
    );
  }

  getById(id: number) {
    return this.apiHttp
      .get<GroupSchedules>(`groupSchedules/${id}`)
      .pipe(catchError((err) => of(undefined)));
  }

  getAll() {
    return this.apiHttp.get<GroupSchedules[]>(`groupSchedules`);
  }

  getSubjectsByGroup(groupId: number) {
    return this.$general.getGroupSubject().pipe(
      map((subjects) => {
        return subjects.filter((subject) => subject.groupId === groupId);
      })
    );
  }
}
