import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { CRUDService } from '../../services/crud/crud.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { GridComponent } from '../../shared/components/grid/grid.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [GridComponent],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'subjects',
    },
  ],
  template: `
    <app-grid
      [title]="'Subjects'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './subject.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent {
  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    { field: 'name', editable: true },
  ];

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Subject',
        placeholder: 'Input Subject name',
        required: true,
      },
    },
  ];
}
