import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';



@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credencials): Observable<any> {

    const body = new HttpParams()
      .set('username', credencials.username.trim())
      .set('password', credencials.password.trim())
      .set('grant_type', 'password');

    return this.http.post(
      Constants.ENDPOINT_LOGIN,
      body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(Constants.ENDPOINT_LOGOUT, {},
      {
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'))
      }
    );
  }
}
