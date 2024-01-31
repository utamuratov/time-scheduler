import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export type ActionType = 'edit' | 'delete';

@Component({
  selector: 'btn-cell-renderer',
  template: ` <button (click)="btnClickedHandler('edit')">Edit</button>
    <button (click)="btnClickedHandler('delete')">Delet</button>`,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(type: ActionType) {
    this.params.clicked({ params: this.params, type });
  }
}
