import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { AchievementServiceService } from 'src/app/service/achievement-service.service';
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

  @Input() owner:Owner
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  private _success = new Subject<string>();
  successMessage = '';
  constructor(private service: AchievementServiceService, private router: AppRoutingModule) { }

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
    let updatedOwner = new Owner(this.owner?.id, this.owner?.name, this.owner?.pass,this.owner?.email, !this.owner.approved);
    this.service.approveOwner(updatedOwner).subscribe((result: Owner) => {
      this.owner = result;
      this._success.next(`${this.owner.name} is ${this.owner.approved ? "approved" : "unapproved"}`);
    },
      (error) => { console.error(error); });
  }
}
