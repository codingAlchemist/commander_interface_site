import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/models/store';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() store: Store;
  eventForm =  this.formBuilder.group({
    eventCode:['', Validators.required]
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submitEvent(){

  }

}
