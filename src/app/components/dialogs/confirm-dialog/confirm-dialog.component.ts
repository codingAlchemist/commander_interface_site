import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Inject(MAT_DIALOG_DATA) message: string;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
