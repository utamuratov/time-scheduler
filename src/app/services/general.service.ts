import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http/api-http.service';
import { Observable } from 'rxjs';
import { Room } from '../models/room.entity';
import { Teacher } from '../models/teacher.entity';
import { Subject } from '../models/subject.entity';
import { Group } from '../models/group.entity';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private apiHttp: ApiHttpService) {}

  getRooms() {
    return this.apiHttp.get(`rooms`) as Observable<Room[]>;
  }

  getTeachers() {
    return this.apiHttp.get(`teachers`) as Observable<Teacher[]>;
  }

  getSubjects() {
    return this.apiHttp.get(`subjects`) as Observable<Subject[]>;
  }

  getGroups() {
    return this.apiHttp.get(`groups`) as Observable<Group[]>;
  }
}
