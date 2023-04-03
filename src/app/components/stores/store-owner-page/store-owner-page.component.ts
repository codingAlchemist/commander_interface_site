import { Component, OnInit, Input } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { Venue } from 'src/app/models/venue';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-owner-page',
  templateUrl: './store-owner-page.component.html',
  styleUrls: ['./store-owner-page.component.scss']
})
export class StoreOwnerPageComponent implements OnInit {
  admin:Venue_Admin = new Venue_Admin();
  storeRegistrationShown = false;
  editAccountDetailsShown = false;
  venues: Venue[] = [];
  constructor(private cookieService: CookieService, private achievmentService: AchievementService, private formBuilder: FormBuilder, private router: Router) { }
  
  revealAddStorePage(){
    this.storeRegistrationShown = !this.storeRegistrationShown // Used to show or hide the add store form
  }

  revealEditAccountDetails(){
    this.editAccountDetailsShown = !this.editAccountDetailsShown
  }
  //Form below is for when the edit button is pressed for updating the owner details
  ownerDetailsForm = this.formBuilder.group({
    username:[this.admin.username],
    email:[this.admin.email],
    password:[this.admin.pass],
    firstname: [this.admin.firstname],
    lastname: [this.admin.lastname]
  })

  ngOnInit(): void {
    var ownerId = this.cookieService.get("ownerId");
    this.achievmentService.getAdminById(ownerId).subscribe((admin) => {
      this.admin = admin;
      console.log(JSON.stringify(admin));
      console.log(`Store count ${this.admin.venues.length}`)
    });
  }
  isEmpty(str:string) {
    return (!str || str.length === 0)
  }

  onUpdateDetails(){
    var username:string = this.admin.username;
    var firstname:string = this.admin.firstname;
    var lastname:string = this.admin.lastname;
    var email:string = this.admin.email
    var password:string = this.admin.pass

    if (!this.isEmpty(this.ownerDetailsForm.value.username!) && this.ownerDetailsForm.value.username != this.admin.username){
      username = this.ownerDetailsForm.value.username!
      console.log(`username input ${username}`)
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.email!) && this.ownerDetailsForm.value.email != this.admin.email) {
      email = this.ownerDetailsForm.value.email!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.firstname!) && this.ownerDetailsForm.value.firstname != this.admin.firstname){
      firstname = this.ownerDetailsForm.value.firstname!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.lastname!) && this.ownerDetailsForm.value.lastname != this.admin.lastname) {
      lastname = this.ownerDetailsForm.value.lastname!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.password!) && this.ownerDetailsForm.value.password != this.admin.pass) {
      password = this.ownerDetailsForm.value.password!
    }
    var owner = new Venue_Admin(this.admin.id,
      username,firstname,lastname,password,email,
      true, []);
      console.log(JSON.stringify(owner));
    this.achievmentService.updateAdminAccount(owner).subscribe((owner) => {
      this.admin = owner;
      this.router.navigate(['/app-store-owner-page']);
    })
  }
}
