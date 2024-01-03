import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { AppConstants } from 'src/app/app.constants';
import { MessagingService } from 'src/app/service/messaging.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  isAdminLogin = false;
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private achievementService: AchievementService,
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService,
    private appConstants: AppConstants,
    private messagingService: MessagingService,
    private dialog: Dialog
  ) {}
  hide = true;

  ngOnInit(): void {}

  signUpSelected() {
    this.router.navigate(['/app-store-owner']);
  }

  openForgotDialog(): void {
    //const ref = this.dialog.open<
  }

  login() {
    if (this.isAdminLogin === true) {
      console.log('Test');
    } else {
      console.log('Test');
      let owner = new Venue_Admin(
        0,
        this.loginForm.value.username!,
        '',
        '',
        this.loginForm.value.password!,
        '',
        false,
        []
      );
      this.achievementService.login(owner).subscribe({
        next: (owner) => {
          this.cookieService.set(this.appConstants.OWNER_ID, `${owner.id}`);
          this.loginService.idEmitter.emit(this.cookieService.get('ownerId'));
          this.messagingService.requestPermission();
          this.messagingService.receiveMessaging();
          this.router.navigate(['/app-store-owner-page']);
        },
        complete: () => {},
        error: (e) => {
          alert(`Error: ${e.message}`);
        },
      });
    }
  }
}
