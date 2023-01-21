import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  })

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    
  }
}
