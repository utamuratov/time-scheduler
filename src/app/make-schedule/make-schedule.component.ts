import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-make-schedule',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './make-schedule.component.html',
  styleUrl: './make-schedule.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeScheduleComponent {
  schedule: { name: string; value: string[][] }[] = [
    { name: 'Monday', value: [[], [], [], [], [], []] },
    { name: 'Tuesday', value: [[], [], [], [], [], []] },
    { name: 'Wednesday', value: [[], [], [], [], [], []] },
    { name: 'Thursday', value: [[], [], [], [], [], []] },
    { name: 'Friday', value: [[], [], [], [], [], []] },
    { name: 'Saturday', value: [[], [], [], [], [], []] },
  ];
  monday = [[], [], [], [], [], []];

  mon1: string[] = [];
  mon2: string[] = [];
  mon3: string[] = [];
  tues1: string[] = [];
  tues2: string[] = [];

  subjects = [
    'Math',
    'Math',
    'Math',
    'Math',
    'Science',
    'Science',
    'Science',
    'Science',
    'English',
    'English',
    'English',
    'English',
    'History',
    'History',
    'History',
    'History',
    'Spanish',
    'Spanish',
    'Spanish',
    'French',
    'French',
    'French',
    'French',
    'Java',
    'Java',
    'Java',
    'PHP',
    'Python',
  ];

  drop(event: CdkDragDrop<string[]>) {
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
