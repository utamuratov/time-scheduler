import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group.entity';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { Teacher } from '../models/teacher.entity';
import { TeacherSubject } from '../models/teacher-subject.entity';
import { SubjectGroup } from '../models/subject-group.entity';
import { GroupSchedules, Schedule } from '../models/schedule.entity';
import { Subject } from '../models/subject.entity';
import { ApiHttpService } from './api-http/api-http.service';

@Injectable({ providedIn: 'root' })
export class GroupSchedulesService {
  constructor(protected apiHttp: ApiHttpService) {}

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
}
