import {Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.estaAutenticado()) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
