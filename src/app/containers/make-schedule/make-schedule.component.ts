import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NameByIdPipe } from '../../shared/pipes/name-by-id.pipe';
import { TeacherSubject } from '../../models/teacher-subject.entity';
import { SubjectGroupTeacher } from '../../models/subject.model';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { GroupSchedules, ISchedule } from '../../models/schedule.entity';
import { GroupSchedulesService } from '../../services/group-schedule.service';
import { map } from 'rxjs';
import { Option } from '../../shared/models/option.model';
import { Group } from '../../models/group.entity';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-make-schedule',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatSelectModule,
    FormsModule,
    NameByIdPipe,
  ],
  templateUrl: './make-schedule.component.html',
  styleUrl: './make-schedule.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeScheduleComponent implements OnInit {
  schedule: { name: string; value: SubjectGroupTeacher[][] }[] = [
    { name: 'Monday', value: [[], [], [], [], [], []] },
    { name: 'Tuesday', value: [[], [], [], [], [], []] },
    { name: 'Wednesday', value: [[], [], [], [], [], []] },
    { name: 'Thursday', value: [[], [], [], [], [], []] },
    { name: 'Friday', value: [[], [], [], [], [], []] },
    { name: 'Saturday', value: [[], [], [], [], [], []] },
  ];

  subjectGroupTeacher: SubjectGroupTeacher[] = [];
  groupSchedules?: GroupSchedules;
  group?: Group;

  $general = inject(GeneralService);
  $groupSchedules = inject(GroupSchedulesService);
  $route = inject(ActivatedRoute);
  cd = inject(ChangeDetectorRef);

  get groupId() {
    return +this.$route.snapshot.params['groupId'];
  }

  get subjects() {
    return this.$route.snapshot.data['subjects'] as Option[];
  }

  get teachers() {
    return this.$route.snapshot.data['teachers'] as Option[];
  }

  get teachersSubjects() {
    return this.$route.snapshot.data['teachersSubjects'] as TeacherSubject[];
  }

  ngOnInit(): void {
    this.$general.getGroupById(this.groupId).subscribe((group) => {
      this.group = group;
    });

    this.makeGroupSubjects(this.groupId).subscribe((subjectGroupTeacher) => {
      this.subjectGroupTeacher = subjectGroupTeacher;
      this.$groupSchedules.getById(this.groupId).subscribe((groupSchedules) => {
        this.groupSchedules = groupSchedules;
        if (groupSchedules) {
          groupSchedules.schedules.forEach((schedule) => {
            const subjectIndex = this.subjectGroupTeacher.findIndex(
              (w) => w.subject.subjectId === schedule.subjectId
            );

            if (subjectIndex >= 0) {
              const subject = structuredClone(
                this.subjectGroupTeacher[subjectIndex]
              );
              subject.teacherId = schedule.teacherId;
              this.schedule[schedule.day].value[schedule.order].push(subject);
              this.subjectGroupTeacher.splice(subjectIndex, 1);
            }
          });
        }
        this.cd.markForCheck();
      });
      this.cd.markForCheck();
    });
  }

  private makeGroupSubjects(groupId: number) {
    return this.$groupSchedules.getSubjectsByGroup(groupId).pipe(
      map((subjects) => {
        const subjectGroupTeacher: SubjectGroupTeacher[] = [];
        subjects.forEach((subject) => {
          const teachers = this.teachersSubjects.filter(
            (teacher) => teacher.subjectId === subject.subjectId
          );
          for (let index = 0; index < subject.hours; index++) {
            subjectGroupTeacher.push({
              subject,
              teachers,
              teacherId: teachers[0]?.teacherId,
            });
          }
        });

        return subjectGroupTeacher;
      })
    );
  }

  drop(event: CdkDragDrop<SubjectGroupTeacher[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (event.container.data.length > 1) {
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex + 1,
          event.previousIndex
        );
      }
    }
  }

  save() {
    this.$groupSchedules.getById(this.groupId).subscribe((groupSchedules) => {
      const schedules = this.getGroupSchedules();
      if (groupSchedules) {
        this.updateSchedule(schedules);
        return;
      }

      this.createSchedule(schedules);
    });
  }

  private updateSchedule(allSubjects: ISchedule[]) {
    this.$groupSchedules
      .update({
        id: this.groupId,
        schedules: allSubjects,
      } as GroupSchedules)
      .subscribe((w) => {
        this.cd.markForCheck();
      });
  }

  private createSchedule(allSubjects: ISchedule[]) {
    this.$groupSchedules
      .create({
        id: this.groupId,
        schedules: allSubjects,
      } as GroupSchedules)
      .subscribe((w) => {
        this.cd.markForCheck();
      });
  }

  private getGroupSchedules() {
    const allSubjects: ISchedule[] = [];
    this.schedule.forEach((day, dayIndex) => {
      day.value.forEach((subjects, orderIndex) => {
        subjects.forEach((subject) => {
          allSubjects.push({
            teacherId: subject.teacherId,
            subjectId: subject.subject.subjectId,
            groupId: this.groupId,
            roomId: 1,
            day: dayIndex,
            order: orderIndex,
          } as ISchedule);
        });
      });
    });
    return allSubjects;
  }
}
