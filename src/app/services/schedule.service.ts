import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group.entity';
import { map } from 'rxjs';
import { Teacher } from '../models/teacher.entity';
import { TeacherSubject } from '../models/teacher-subject.entity';
import { SubjectGroup } from '../models/subject-group.entity';
import { Schedule } from '../models/schedule.entity';
import { Subject } from '../models/subject.entity';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  readonly endpint = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  groups = this.httpClient.get<Group[]>(`${this.endpint}/groups`);

  getTeachersBySubject(subjectId: number) {
    return this.getTeacherSubject().pipe(
      map((teachers) => {
        return teachers.filter((teacher) => teacher.subjectId === subjectId);
      })
    );
  }

  getSubjectsByGroup(groupId: number) {
    return this.getGroupSubject().pipe(
      map((subjects) => {
        return subjects.filter((subject) => subject.groupId === groupId);
      })
    );
  }

  getSchedulesByGroup(groupId: number) {
    return this.getSchedules().pipe(
      map((schedules) => {
        return schedules.filter((schedule) => schedule.groupId === groupId);
      })
    );
  }

  getTeachers() {
    return this.httpClient.get<Teacher[]>(`${this.endpint}/teachers`);
  }

  getSubjects() {
    return this.httpClient.get<Subject[]>(`${this.endpint}/subjects`);
  }

  getSubjectById(subjectId: number) {
    return this.httpClient.get(`${this.endpint}/subjects/${subjectId}`);
  }

  getTeacherSubject() {
    return this.httpClient.get<TeacherSubject[]>(
      `${this.endpint}/teacherSubject`
    );
  }

  getGroupSubject() {
    return this.httpClient.get<SubjectGroup[]>(`${this.endpint}/subjectGroup`);
  }

  getSchedules() {
    return this.httpClient.get<Schedule[]>(`${this.endpint}/schedules`);
  }
}
