import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public estaAutenticado(): boolean {

    const token = localStorage.getItem('token');

    /*if (token != null) {
      return true;
    }else {
      console.log('No Estas Autenticado');
      return false;
    }*/

    return true;
  }
}
