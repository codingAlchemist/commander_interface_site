import { Component, OnInit } from '@angular/core';
import { Owner } from './models/owner';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ownerId: string
  title = 'commander-site';

  constructor(private cookieService: CookieService, private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    this.ownerId = this.cookieService.get("ownerId");
    this.loginService.idEmitter.subscribe(ownerID => {
      this.ownerId = ownerID
      console.log(this.ownerId.length == 0); 
    })
  }

  logout(){
    this.cookieService.deleteAll();
    this.loginService.idEmitter.emit("")
    this.router.navigate(['/app-login-screen']);
  }
}
