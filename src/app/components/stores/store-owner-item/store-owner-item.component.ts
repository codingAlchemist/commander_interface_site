import { Component, OnInit, Input } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { AchievementServiceService } from 'src/app/service/achievement-service.service';

@Component({
  selector: 'app-store-owner-item',
  templateUrl: './store-owner-item.component.html',
  styleUrls: ['./store-owner-item.component.scss']
})
export class StoreOwnerItemComponent implements OnInit {

  @Input() owner:Owner

  constructor(private service: AchievementServiceService) { }

  ngOnInit(): void {
  }

  onApproveClick(){
    let updatedOwner = new Owner(this.owner?.id, this.owner?.name, this.owner?.pass,this.owner?.email, true);
    this.service.approveOwner(updatedOwner).subscribe((result: Owner) => {
      this.owner = result;
    })
  }
}
