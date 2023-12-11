import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import { ScheduleService } from '../services/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../models/subject.entity';

@Component({
  selector: 'app-make-schedule',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './make-schedule.component.html',
  styleUrl: './make-schedule.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeScheduleComponent implements OnInit {
  schedule: { name: string; value: Subject[][] }[] = [
    { name: 'Monday', value: [[], [], [], [], [], []] },
    { name: 'Tuesday', value: [[], [], [], [], [], []] },
    { name: 'Wednesday', value: [[], [], [], [], [], []] },
    { name: 'Thursday', value: [[], [], [], [], [], []] },
    { name: 'Friday', value: [[], [], [], [], [], []] },
    { name: 'Saturday', value: [[], [], [], [], [], []] },
  ];

  subjects: Subject[] = [];

  $schedule = inject(ScheduleService);
  route = inject(ActivatedRoute);
  groupdId = +this.route.snapshot.params['groupId'];

  ngOnInit(): void {
    this.$schedule.getSubjectsByGroup(this.groupdId).subscribe((subjects) => {
      this.$schedule.getSubjects().subscribe((allSubjects) => {
        this.subjects = allSubjects.filter((subject) =>
          subjects.find((w) => w.subjectId === subject.id)
        );
      });
    });
    this.$schedule.getSchedulesByGroup(this.groupdId).subscribe((schedules) => {
      schedules.forEach((schedule) => {
        const subject = this.subjects.find((w) => w.id === schedule.subjectId);
        if (subject)
          this.schedule[schedule.day].value[schedule.order].push(subject);
      });
    });
  }

  drop(event: CdkDragDrop<Subject[]>) {
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
}
