import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatDialogTitle,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>Add / Edit</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="mat-typography">
        <formly-form [form]="form" [model]="data.model" [fields]="data.fields">
        </formly-form>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button type="submit">Submit</button>
        <button mat-button type="reset">Reset</button>
      </mat-dialog-actions>
    </form>
  `,
  styleUrl: './add-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {
  form = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({ data: this.data.model });
    }
  }
}
