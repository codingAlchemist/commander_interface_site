import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './service/login.service';
import { AppConstants } from './app.constants';
import { SwPush } from '@angular/service-worker';
import { MessagingService } from './service/messaging.service';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ownerId: string;
  eventCode: string;
  title = 'commander-site';
  @ViewChild('achievementsButton') achievementButton: ElementRef;
  message: any;
  buttonVisibility: Boolean = true;
  readonly VAPID_PUBLIC_KEY =
    'BK3KToV7oLbAIlPdImiSHw-UAcT_9cN33kxj3JR2iU447P8AUZNf2QQH6UFD85JCAGksRVgTTACyBP-bDma2qYw';
  constructor(
    private elementRef: ElementRef,
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService,
    private appConstants: AppConstants,
    private swPush: SwPush
  ) {}
  ngOnInit(): void {
    this.buttonVisibility = AppConstants.ACHIEVEMENTS_BUTTON_VISIBLE;
    this.ownerId = this.cookieService.get(this.appConstants.OWNER_ID);
    this.eventCode = this.cookieService.get(this.appConstants.EVENT_CODE);
    this.loginService.idEmitter.subscribe((ownerID) => {
      this.ownerId = ownerID;
      console.log(this.ownerId.length == 0);
    });
  }
  loginSelected() {
    this.router.navigate(['/app-login-screen']);
  }
  signUpSelected() {
    this.router.navigate(['/app-store-owner']);
  }
  logout() {
    this.cookieService.deleteAll();
    this.loginService.idEmitter.emit('');
    this.router.navigate(['/app-login-screen']);
  }
  goHome() {
    this.router.navigate(['./app-store-owner-page']);
  }
  goToAchievements() {
    this.router.navigate(['./app-achievement-list']);
  }
  requestSubscription() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log(JSON.stringify(sub));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
