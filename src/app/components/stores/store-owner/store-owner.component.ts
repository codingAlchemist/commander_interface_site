import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AchievementServiceService } from '../../../service/achievement-service.service';
import { Owner } from 'src/app//models/owner';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner.component.html',
  styleUrls: ['./store-owner.component.scss']
})
export class StoreOwnerComponent implements OnInit {
  
  storeOwnerForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private service:AchievementServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  
  }

  onSubmit() {
    var owner = new Owner(0, this.storeOwnerForm.value.name!, this.storeOwnerForm.value.pass!, this.storeOwnerForm.value.email!, false)
    this.service.createStoreOwner(owner).subscribe(owner => {
      console.log(JSON.stringify(owner));
      var email = new Email(owner.email, "Applicant",`${owner.name} has requested to join commander achievements`);
      this.service.emailUser(email).subscribe(email => {
        
      })
    });
  }
}
