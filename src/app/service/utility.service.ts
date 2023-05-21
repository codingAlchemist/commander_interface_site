import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private router: Router) {}
  reloadPage() {
    this.router.navigate([this.router.url]);
  }
}
