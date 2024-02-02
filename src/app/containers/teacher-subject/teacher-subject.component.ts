import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { CRUDService } from '../../services/crud/crud.service';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { ActivatedRoute } from '@angular/router';
import { nameByIdGetter } from '../../shared/utilits/utilit';

@Component({
  selector: 'app-teacher-subject',
  standalone: true,
  imports: [GridComponent],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'teacherSubject',
    },
  ],
  template: `
    <app-grid
      [title]="'Teacher Subjects'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './teacher-subject.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherSubjectComponent {
  private $route = inject(ActivatedRoute);

  get teachers() {
    return this.$route.snapshot.data['teachers'];
  }

  get subjects() {
    return this.$route.snapshot.data['subjects'];
  }

  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    {
      field: 'teacherId',
      editable: false,
      valueGetter: nameByIdGetter('teacherId', this.teachers),
    },
    {
      field: 'subjectId',
      editable: false,
      valueGetter: nameByIdGetter('subjectId', this.subjects),
    },
    { field: 'hours', headerName: 'Hours (weekly)', editable: true },
  ];
  fields: FormlyFieldConfig[] = [
    {
      key: 'teacherId',
      type: 'select',
      props: {
        label: 'Teacher',
        placeholder: 'Teacherni tanlang',
        options: this.teachers,
      },
    },
    {
      key: 'subjectId',
      type: 'select',
      props: {
        label: 'Subject',
        placeholder: 'Subjectni tanlang',
        options: this.subjects,
      },
    },
    {
      key: 'hours',
      type: 'input',
      props: {
        label: 'Hours (weekly)',
        placeholder: 'Input hours',
        type: 'number',
      },
    },
  ];
}
