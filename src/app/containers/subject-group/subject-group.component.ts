import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { CRUDService } from '../../services/crud/crud.service';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { ActivatedRoute } from '@angular/router';
import { nameByIdGetter } from '../../shared/utilits/utilit';

@Component({
  selector: 'app-subject-group',
  standalone: true,
  imports: [GridComponent],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'subjectGroup',
    },
  ],
  template: `
    <app-grid
      [title]="'Subject Group'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './subject-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectGroupComponent {
  private $route = inject(ActivatedRoute);

  get subjects() {
    return this.$route.snapshot.data['subjects'];
  }

  get groups() {
    return this.$route.snapshot.data['groups'];
  }

  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    {
      field: 'groupId',
      valueGetter: nameByIdGetter('groupId', this.groups),
      editable: false,
    },
    {
      field: 'subjectId',
      valueGetter: nameByIdGetter('subjectId', this.subjects),
      editable: false,
    },
    { field: 'hours', headerName: 'Hours (weekly)', editable: true },
  ];
  fields: FormlyFieldConfig[] = [
    {
      key: 'groupId',
      type: 'select',
      props: {
        label: 'Group',
        placeholder: 'Groupni tanlang',
        options: this.groups,
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
