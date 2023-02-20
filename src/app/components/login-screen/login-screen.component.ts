import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Owner } from 'src/app/models/owner';
import { AchievementService } from 'src/app/service/achievement-service.service';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  isAdminLogin = false;
  loginForm = this.formBuilder.group({
    username:['',[Validators.required]],
    password: ['',[Validators.required]]
  })

  constructor( private formBuilder: FormBuilder, private achievementService: AchievementService, private cookieService: CookieService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    if (this.isAdminLogin === true) {
      console.log("Test");
    } else {
      console.log("Test");
      let owner = new Owner(0, this.loginForm.value.username!,"","", this.loginForm.value.password!, "", false);
      this.achievementService.loginOwner(owner).subscribe( (owner) => {
        this.cookieService.set("ownerId",`${owner.id}`);
        this.loginService.idEmitter.emit(this.cookieService.get("ownerId"));
        this.router.navigate(['/app-store-owner-page']);
      })
    }
  }
}
