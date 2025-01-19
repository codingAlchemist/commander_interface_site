import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AchievementService } from 'src/app/service/achievement-service.service';

@Component({
  selector: 'app-forgot-dialog',
  templateUrl: './forgot-dialog.component.html',
  styleUrls: ['./forgot-dialog.component.scss'],
})
export class ForgotDialogComponent implements OnInit {
  isForPassword: boolean = true;

  constructor(
    private service: AchievementService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ForgotDialogComponent>
  ) {}

  forgotForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    isForPassword: [false],
  });
  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  submitForgotUsernameOrPassword() {
    alert(JSON.stringify(this.forgotForm.value));
    if (this.forgotForm.value.isForPassword! == true) {
      this.service.forgotPassword(this.forgotForm.value.email!);
    } else {
      this.service.forgotUsername(this.forgotForm.value.email!);
    }
  }
}
