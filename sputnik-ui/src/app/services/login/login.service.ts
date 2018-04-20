import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Constants} from '../../../assets/constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Credential} from '../../models/login/credentials.model';
import {LoginModel} from '../../models/login/login.model';
import {LoginResponse} from '../../models/login/login-response';


@Injectable()
export class LoginService {


    constructor(private http: HttpClient) {}

    /**
     * gcallisaya 20/12/2017 : Inicio de Sesión mediante un Servicio POST
     *
     * @endpoint /auth/
     * **/
    loginFromEndpoint(credencials): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 'Accept-Language': 'es-BOE;q=0.8'
        })
      }
      return this.http.post(Constants.ENDPOINT_LOGIN, credencials, httpOptions);

    }


}
