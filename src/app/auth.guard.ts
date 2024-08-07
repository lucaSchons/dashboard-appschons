import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth();
  }

  private checkAuth() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}