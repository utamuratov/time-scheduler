import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group.entity';
import { Observable, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { Teacher } from '../models/teacher.entity';
import { TeacherSubject } from '../models/teacher-subject.entity';
import { SubjectGroup } from '../models/subject-group.entity';
import { GroupSchedules, Schedule } from '../models/schedule.entity';
import { Subject } from '../models/subject.entity';
import { ApiHttpService } from './api-http/api-http.service';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(protected apiHttp: ApiHttpService) {}

  groups = this.apiHttp.get(`groups`) as Observable<Group[]>;

  getSubjectsByGroup(groupId: number) {
    return this.getGroupSubject().pipe(
      map((subjects) => {
        return subjects.filter((subject) => subject.groupId === groupId);
      })
    );
  }

  getGroupById(groupId: number) {
    return this.apiHttp.get<Group>(`groups/${groupId}`);
  }

  getTeachers() {
    return this.apiHttp.get<Teacher[]>(`teachers`);
  }

  getSubjects() {
    return this.apiHttp.get<Subject[]>(`subjects`);
  }

  getSubjectById(subjectId: number) {
    return this.apiHttp.get<Subject>(`subjects/${subjectId}`);
  }

  getTeacherSubject() {
    return this.apiHttp.get<TeacherSubject[]>(`teacherSubject`);
  }

  getGroupSubject() {
    return this.apiHttp.get<SubjectGroup[]>(`subjectGroup`);
  }

  getSchedules() {
    return this.apiHttp.get<Schedule[]>(`schedules`);
  }

  create(schedule: Schedule) {
    return this.apiHttp.post<Schedule>(`schedules`, schedule);
  }

  deleteAllSchedules() {
    return this.getSchedules().pipe(
      mergeMap((schedules) => {
        if (schedules.length === 0) {
          return of([]);
        }

        return forkJoin(
          schedules.map((s) => s.id).map((id) => this.deletSchedule(id))
        );
      })
    );
  }

  deletSchedule(id: number) {
    return this.apiHttp.delete<Schedule>(`schedules/${id}`);
  }
}
