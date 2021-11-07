import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.hasToken()) return true;
    this.router.navigate(['auth']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
