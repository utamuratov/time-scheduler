import { SubjectGroup } from './subject-group.entity';
import { Subject } from './subject.entity';
import { TeacherSubject } from './teacher-subject.entity';

export type SubjectRequest = Pick<Subject, 'name'>;

export interface SubjectGroupTeacher {
  subject: SubjectGroup;
  teachers: TeacherSubject[];
  teacherId?: number;
}
