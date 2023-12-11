import { Id } from './id.interface';

export interface TeacherSubject extends Id {
  subjectId: number;
  teacherId: number;
  hours: number; // ajratilgan soatlar soni
}
