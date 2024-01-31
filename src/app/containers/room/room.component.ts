import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { CRUDService } from '../../services/crud/crud.service';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { ColDef } from 'ag-grid-community';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [GridComponent],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'rooms',
    },
  ],
  template: `
    <app-grid
      [title]="'Rooms'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './room.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    { field: 'name', editable: true },
    { field: 'type', editable: true },
  ];
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        placeholder: 'Input name',
        required: true,
      },
    },
    {
      key: 'type',
      type: 'input',
      props: {
        label: 'Type',
        placeholder: 'Input type',
        required: true,
      },
    },
  ];
}
