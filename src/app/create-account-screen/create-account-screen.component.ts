import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AchievementServiceService } from '../achievement-service.service';
@Component({
  selector: 'app-create-account-screen',
  templateUrl: './create-account-screen.component.html',
  styleUrls: ['./create-account-screen.component.scss']
})
export class CreateAccountScreenComponent implements OnInit {
  
  createAccountForm = this.formBuilder.group({
    name: ['', Validators.required,Validators.minLength(8)],
    nickName: ['', Validators.required],
    password: ['', Validators.required,Validators.minLength(8)],
    email:['',Validators.email],
    age:'',
    desc:'',
    location:''
  });

  constructor(private service:AchievementServiceService, private formBuilder: FormBuilder) { }

  createAccount(){
    
  }
  ngOnInit(): void {
  }

}
