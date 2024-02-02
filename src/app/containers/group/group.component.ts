import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { CRUDService } from '../../services/crud/crud.service';
import { CRUD_RESOURCE_URL } from '../../services/crud/crud-resource-url';
import { ActivatedRoute, Router } from '@angular/router';
import { nameByIdGetter } from '../../shared/utilits/utilit';
import { BtnScheduleRenderer } from './components/button-cell-renderer.component';
import { Group } from '../../models/group.entity';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [GridComponent],
  providers: [
    CRUDService,
    {
      provide: CRUD_RESOURCE_URL,
      useValue: 'groups',
    },
  ],
  template: `
    <app-grid
      [title]="'Groups'"
      [colDefs]="colDefs"
      [fields]="fields"
    ></app-grid>
  `,
  styleUrl: './group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent {
  private $route = inject(ActivatedRoute);
  private $router = inject(Router);

  get rooms() {
    return this.$route.snapshot.data['rooms'];
  }

  colDefs: ColDef[] = [
    { field: 'id', editable: false },
    { field: 'name', editable: true },
    {
      field: 'roomId',
      editable: false,
      valueGetter: nameByIdGetter('roomId', this.rooms),
    },
    {
      field: 'schedule',
      editable: false,
      cellRenderer: BtnScheduleRenderer,
      cellRendererParams: {
        clicked: (data: { params: any }) => {
          const model = data.params.data as Group;
          this.$router.navigate(['make-schedule', model.id]);
        },
      },
    },
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
      key: 'roomId',
      type: 'select',
      props: {
        label: 'Room',
        placeholder: 'Roomni tanlang',
        options: this.rooms,
      },
    },
  ];
}
