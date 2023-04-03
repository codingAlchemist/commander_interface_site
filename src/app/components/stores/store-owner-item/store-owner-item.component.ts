import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Venue_Admin } from 'src/app/models/venue_admin';
import { AchievementService } from 'src/app/service/achievement-service.service';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectableObservable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-store-owner-item',
  templateUrl: './store-owner-item.component.html',
  styleUrls: ['./store-owner-item.component.scss']
})

export class StoreOwnerItemComponent implements OnInit {

  @Input() admin:Venue_Admin
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  private _success = new Subject<string>();
  successMessage = '';
  constructor(private service: AchievementService, private router: AppRoutingModule) { }
  
  ngOnInit(): void {
  }
  onSuccess(){
    this._success.subscribe((message) => (this.successMessage = message));
		this._success.pipe(debounceTime(5000)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }
  
  onApproveClick(){
    console.log("test");
    this.onSuccess();
    window.location.reload();
    let updatedOwner = new Venue_Admin(this.admin?.id, this.admin?.username,this.admin?.firstname,this.admin?.lastname, this.admin?.pass,this.admin?.email, !this.admin.approved, []);
    this.service.approveAdminAccount(updatedOwner).subscribe((result: Venue_Admin) => {
      this.admin = result;
      this._success.next(`${this.admin.username} is ${this.admin.approved ? "approved" : "unapproved"}`);
    },
      (error) => { console.error(error); });
  }
}
