import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AchievementService } from '../../../service/achievement-service.service';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { Venue } from 'src/app/models/venue';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.scss'],
})
export class StoreRegistrationComponent implements OnInit {
  storeRegistrationForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    logo: [''],
    venue_number: [''],
  });

  constructor(
    private service: AchievementService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  @Input() admin: Venue_Admin;
  ngOnInit(): void {}

  onSubmit() {
    var admin = new Venue(
      0,
      this.admin.id,
      this.storeRegistrationForm.value.name!,
      this.storeRegistrationForm.value.street!,
      this.storeRegistrationForm.value.city!,
      this.storeRegistrationForm.value.state!,
      this.storeRegistrationForm.value.zip!,
      this.storeRegistrationForm.value.logo!,
      this.storeRegistrationForm.value.venue_number!
    );
    this.service.createVenue(admin).subscribe((admin) => {
      console.log(JSON.stringify(admin));
      var dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: 'Venue added successfully' },
        height: '300px',
        width: '400px',
      });
      dialogRef.afterClosed().subscribe((_) => {
        location.reload();
      });
    });
  }
}
