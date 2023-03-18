import { Component, OnInit, Input } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { Owner } from 'src/app/models/owner';
import { Store } from 'src/app/models/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-owner-page',
  templateUrl: './store-owner-page.component.html',
  styleUrls: ['./store-owner-page.component.scss']
})
export class StoreOwnerPageComponent implements OnInit {
  owner:Owner = new Owner();
  storeRegistrationShown = false;
  editAccountDetailsShown = false;
  stores: Store[] = [];
  constructor(private cookieService: CookieService, private achievmentService: AchievementService, private formBuilder: FormBuilder, private router: Router) { }
  
  revealAddStorePage(){
    this.storeRegistrationShown = !this.storeRegistrationShown // Used to show or hide the add store form
  }

  revealEditAccountDetails(){
    this.editAccountDetailsShown = !this.editAccountDetailsShown
  }
  //Form below is for when the edit button is pressed for updating the owner details
  ownerDetailsForm = this.formBuilder.group({
    username:[this.owner.username],
    email:[this.owner.email],
    password:[this.owner.pass],
    firstname: [this.owner.firstname],
    lastname: [this.owner.lastname]
  })

  ngOnInit(): void {
    var ownerId = this.cookieService.get("ownerId");
    this.achievmentService.getOwner(ownerId).subscribe((owner) => {
      this.owner = owner;
      this.achievmentService.getStoresByOwner(`${this.owner.id}`).subscribe((stores) => {
        stores.forEach( store => {
          this.stores.push(store);
        });
      })
    });
  }
  isEmpty(str:string) {
    return (!str || str.length === 0)
  }
  onUpdateDetails(){
    var username:string = this.owner.username;
    var firstname:string = this.owner.firstname;
    var lastname:string = this.owner.lastname;
    var email:string = this.owner.email
    var password:string = this.owner.pass

    if (!this.isEmpty(this.ownerDetailsForm.value.username!) && this.ownerDetailsForm.value.username != this.owner.username){
      username = this.ownerDetailsForm.value.username!
      console.log(`username input ${username}`)
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.email!) && this.ownerDetailsForm.value.email != this.owner.email) {
      email = this.ownerDetailsForm.value.email!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.firstname!) && this.ownerDetailsForm.value.firstname != this.owner.firstname){
      firstname = this.ownerDetailsForm.value.firstname!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.lastname!) && this.ownerDetailsForm.value.lastname != this.owner.lastname) {
      lastname = this.ownerDetailsForm.value.lastname!
    }
    if (!this.isEmpty(this.ownerDetailsForm.value.password!) && this.ownerDetailsForm.value.password != this.owner.pass) {
      password = this.ownerDetailsForm.value.password!
    }
    var owner = new Owner(this.owner.id,
      username,firstname,lastname,password,email,
      true);
      console.log(JSON.stringify(owner));
    this.achievmentService.updateOwner(owner).subscribe((owner) => {
      this.owner = owner;
      this.router.navigate(['/app-store-owner-page']);
    })
  }
}
