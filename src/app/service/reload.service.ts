import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  shouldReloadEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}
}
