import { Component, OnInit, Input} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AchievementService } from '../../../service/achievement-service.service';
import { Owner } from 'src/app/models/owner';
import { Store } from 'src/app/models/store';
@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.scss']
})
export class StoreRegistrationComponent implements OnInit {

  storeRegistrationForm =  this.formBuilder.group({
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    logo: [''],
    store_number: ['']
  })
  
  constructor(private service:AchievementService, private formBuilder: FormBuilder) { }
  
  @Input() owner:Owner;
  ngOnInit(): void {
  }
  
  onSubmit(){
    var store = new Store(0, this.owner.id, this.storeRegistrationForm.value.name!, this.storeRegistrationForm.value.street!, this.storeRegistrationForm.value.city!, this.storeRegistrationForm.value.state!, this.storeRegistrationForm.value.zip!, this.storeRegistrationForm.value.logo!, this.storeRegistrationForm.value.store_number!);
    this.service.createStore(store).subscribe(store => {
      console.log(JSON.stringify(store));
    })
  }
}
