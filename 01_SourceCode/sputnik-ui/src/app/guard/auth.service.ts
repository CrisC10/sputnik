import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public estaAutenticado(): boolean {

    const token = localStorage.getItem('access_token');

    if (token != null) {
      return true;
      /* console.log('Esta tu token vivo? ' + !this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
      if (!this.jwtHelper.isTokenExpired(token) && token) {
        console.log('Estas Autenticado');
        return true;
      }else {
        return false;
      }*/
    }else {
      console.log('No Estas Autenticado');
      return false;
    }
  }
}
