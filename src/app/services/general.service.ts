import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http/api-http.service';
import { Room } from '../models/room.entity';
import { Teacher } from '../models/teacher.entity';
import { Subject } from '../models/subject.entity';
import { Group } from '../models/group.entity';
import { SubjectGroup } from '../models/subject-group.entity';
import { TeacherSubject } from '../models/teacher-subject.entity';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private apiHttp: ApiHttpService) {}

  getRooms() {
    return this.apiHttp.get<Room[]>(`rooms`);
  }

  getTeachers() {
    return this.apiHttp.get<Teacher[]>(`teachers`);
  }

  getSubjects() {
    return this.apiHttp.get<Subject[]>(`subjects`);
  }

  getGroups() {
    return this.apiHttp.get<Group[]>(`groups`);
  }

  getGroupById(groupId: number) {
    return this.apiHttp.get<Group>(`groups/${groupId}`);
  }

  getGroupSubject() {
    return this.apiHttp.get<SubjectGroup[]>(`subjectGroup`);
  }

  getTeacherSubject() {
    return this.apiHttp.get<TeacherSubject[]>(`teacherSubject`);
  }
}
