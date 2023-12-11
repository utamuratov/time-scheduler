import { Id } from './id.interface';

export interface SubjectGroup extends Id {
  subjectId: number;
  groupId: number;
  hours: number; // ajratilgan soatlar soni
}
