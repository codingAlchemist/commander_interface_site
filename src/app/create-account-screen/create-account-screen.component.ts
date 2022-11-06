import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AchievementServiceService } from '../achievement-service.service';
import { Player } from '../models/player';
@Component({
  selector: 'app-create-account-screen',
  templateUrl: './create-account-screen.component.html',
  styleUrls: ['./create-account-screen.component.scss']
})
export class CreateAccountScreenComponent implements OnInit {
  
  createAccountForm = this.formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(8)]],
    nickName: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(8)]],
    email:['',Validators.email]
  });

  constructor(private service:AchievementServiceService, private formBuilder: FormBuilder) { }

  createAccount(){
    let player = new Player(
      this.createAccountForm.value.name!,
      this.createAccountForm.value.password!,
      this.createAccountForm.value.nickName!,
      "this is a new player",
      1,0,this.createAccountForm.value.email!,
    );
    this.service.createPlayer(
      player
    ).subscribe(player => console.log(player.name))
    console.log("player create")
  }
  ngOnInit(): void {
  }

}
