import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CellEditRequestEvent,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ActionType, BtnCellRenderer } from '../button-cell-renderer.component';
import { Id } from '../../../models/id.interface';
import { CRUDService } from '../../../services/crud/crud.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AsyncPipe, AgGridModule, MatButtonModule, MatDialogModule],
  template: `
    <h1>{{ title }}</h1>
    <button (click)="openAddEditDialog()">Add</button>
    <ag-grid-angular
      [rowData]="data$ | async"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [readOnlyEdit]="true"
      (cellEditRequest)="onCellEditRequest($event)"
      (gridReady)="onGridReady($event)"
      class="ag-theme-quartz"
      style="height: 800px;"
    >
    </ag-grid-angular>
  `,
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends Id = any> {
  @Input({ required: true })
  title!: string;
  @Input({ required: true })
  fields!: FormlyFieldConfig[];

  // Column Definitions: Defines & controls grid columns.
  private _colDefs!: ColDef[];
  public get colDefs(): ColDef[] {
    return this._colDefs;
  }
  @Input({ required: true })
  public set colDefs(v: ColDef[]) {
    v.push({
      field: 'actions',
      editable: false,
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: (data: { params: any; type: ActionType }) => {
          const model = data.params.data as T;
          const type = data.type;
          if (type == 'edit') {
            this.openAddEditDialog(model);
          } else if (type == 'delete') {
            this.delete(model.id);
          }
        },
      },
    });
    this._colDefs = v;
  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

  private $crud = inject(CRUDService);
  private _cd = inject(ChangeDetectorRef);
  data$!: Observable<T[]>;

  constructor(public dialog: MatDialog) {}

  openAddEditDialog(model?: T) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: { model: model ?? {}, fields: this.fields },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const subject = result.data as T;
        if (subject.id) {
          // EDIT
          this.$crud.update(subject.id, subject).subscribe((w) => {
            this.data$ = this.$crud.read<T>();
            this._cd.markForCheck();
          });
          return;
        }

        // ADD
        this.$crud.create(result.data).subscribe((w) => {
          this.data$ = this.$crud.read<T>();
          this._cd.markForCheck();
        });
      }
    });
  }

  delete(id: number | string) {
    this.$crud.delete(id).subscribe((w) => {
      console.log('delete, deleting ' + id);
      this.data$ = this.$crud.read<T>();
      this._cd.markForCheck();
    });
  }

  onCellEditRequest(event: CellEditRequestEvent) {
    const oldData = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newData = { ...oldData };
    if (newData[field!] === newValue) {
      return;
    }
    newData[field!] = event.newValue;
    this.$crud.update(oldData.id, newData).subscribe((w) => {
      console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
      const tx = {
        update: [newData],
      };
      event.api.applyTransaction(tx);
    });
  }

  onGridReady(params: GridReadyEvent<T>) {
    this.data$ = this.$crud.read<T>();
  }
}
