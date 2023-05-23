import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AchievementService } from '../../../service/achievement-service.service';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { Email } from 'src/app/models/email';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmData,
  ConfirmDialogComponent,
} from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner-registration.component.html',
  styleUrls: ['./store-owner-registration.component.scss'],
})
export class StoreOwnerRegistrationComponent implements OnInit {
  storeOwnerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private service: AchievementService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}
  hide = true;
  ngOnInit(): void {}

  get registrationFormControls() {
    return this.storeOwnerForm.controls;
  }

  onSubmit() {
    var owner = new Venue_Admin(
      0,
      this.storeOwnerForm.value.username!,
      this.storeOwnerForm.value.firstname!,
      this.storeOwnerForm.value.lastname!,
      this.storeOwnerForm.value.pass!,
      this.storeOwnerForm.value.email!,
      false,
      []
    );
    this.service.createAccount(owner).subscribe((owner) => {
      console.log(JSON.stringify(owner));
      var email = new Email(
        owner.email,
        'Applicant',
        `${owner.username} has requested to join commander achievements`,
        owner.email
      );
      this.service.emailUser(email).subscribe(
        (email) => {
          var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Registration',
              message: 'Registration sent! Check back soon.',
              buttonTitle: 'Ok',
            },
            height: '200px',
            width: '400px',
          });
          dialogRef.afterClosed().subscribe((data) => {
            this.router.navigate(['./app-login-screen']);
          });
        },
        (error) => {
          this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Error',
              message: 'Something went wrong, try again later.',
            },
            height: '300px',
            width: '400px',
          });
        }
      );
    });
  }
}
