import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  idEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  
}
