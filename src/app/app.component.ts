import { Component, OnInit } from '@angular/core';
import { Owner } from './models/owner';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ownerId: string
  title = 'commander-site';

  constructor(private cookieService: CookieService){}

  ngOnInit(): void {
      this.ownerId = this.cookieService.get("ownerId");
  }

}
