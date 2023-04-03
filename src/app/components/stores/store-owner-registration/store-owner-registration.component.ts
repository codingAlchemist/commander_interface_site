import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AchievementService } from '../../../service/achievement-service.service';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner-registration.component.html',
  styleUrls: ['./store-owner-registration.component.scss']
})
export class StoreOwnerRegistrationComponent implements OnInit {
  
  storeOwnerForm = this.formBuilder.group({
    username: ['',[Validators.required, Validators.minLength(3)]],
    firstname: ['',[Validators.required, Validators.minLength(3)]],
    lastname: ['',[Validators.required, Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private service:AchievementService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }

  onSubmit() {
    var owner = new Venue_Admin(0, this.storeOwnerForm.value.username!,this.storeOwnerForm.value.firstname!,this.storeOwnerForm.value.lastname!, this.storeOwnerForm.value.pass!, this.storeOwnerForm.value.email!, false, [])
    this.service.createAccount(owner).subscribe(owner => {
      console.log(JSON.stringify(owner));
      var email = new Email(owner.email, "Applicant",`${owner.username} has requested to join commander achievements`);
      this.service.emailUser(email).subscribe(email => {
        
      })
    });
  }
}
