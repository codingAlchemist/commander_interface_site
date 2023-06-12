import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {}

  requestPermission() {
    console.log('requesting permission');
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (error) => {
        console.log('unable tp get permission to notify...', error);
      }
    );
  }

  receiveMessaging() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log(JSON.stringify(payload));
      this.currentMessage.next(payload);
    });
  }
}
