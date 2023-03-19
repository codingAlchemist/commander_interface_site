import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Owner } from './models/owner';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './service/login.service';
import { AppConstants } from './app.constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  ownerId: string
  eventCode: string
  title = 'commander-site';
  readonly VAPID_PUBLIC_KEY = "BDarFN67c27h5MiPa_lO_fF3mdthYlji50ASTKMYkHeBpPbYqG-h8L4Ymfh9Ub5iaOT3CCAqm-W2JlcNZ-GuWkg";
  constructor(private elementRef: ElementRef, private cookieService: CookieService, private router: Router, private loginService: LoginService, private appConstants: AppConstants){
    
  }
  ngAfterViewInit(): void {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e8eaf6';
  }
  ngOnInit(): void {
    this.ownerId = this.cookieService.get(this.appConstants.OWNER_ID);
    this.eventCode = this.cookieService.get(this.appConstants.EVENT_CODE);
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
