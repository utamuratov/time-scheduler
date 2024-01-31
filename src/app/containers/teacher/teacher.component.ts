import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CRUDService } from '../../services/crud/crud.service';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    AsyncPipe,
    GridComponent,
    AgGridModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'teachers',
    },
  ],
  template: `
    <app-grid
      [title]="'Teachers'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './teacher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherComponent {
  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    { field: 'firstName', editable: true },
    { field: 'lastName', editable: true },
  ];

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'Firstname',
        placeholder: 'Input Firstname',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Lastname',
        placeholder: 'Input Lastname',
        required: true,
      },
    },
    // {
    //   key: 'textarea',
    //   type: 'textarea',
    //   props: {
    //     label: 'Textarea',
    //     placeholder: 'Textarea placeholder',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'checkbox',
    //   type: 'checkbox',
    //   props: {
    //     label: 'Checkbox',
    //   },
    // },
    // {
    //   key: 'select',
    //   type: 'select',
    //   props: {
    //     label: 'Select',
    //     placeholder: 'Select placeholder',
    //     required: true,
    //     options: [
    //       { label: 'Option 1', value: '1' },
    //       { label: 'Option 2', value: '2' },
    //       { label: 'Option 3', value: '3' },
    //     ],
    //   },
    // },
    // {
    //   key: 'radio',
    //   type: 'radio',
    //   props: {
    //     label: 'Radio',
    //     required: true,
    //     options: [
    //       { label: 'Option 1', value: '1' },
    //       { label: 'Option 2', value: '2' },
    //     ],
    //   },
    // },
  ];
}
