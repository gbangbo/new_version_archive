import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LayoutService } from '../services/layout.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private router: Router, private layoutService: LayoutService) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user || !Object.keys(user).length) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
  
}
