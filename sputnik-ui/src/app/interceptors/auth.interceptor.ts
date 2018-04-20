import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {Constants} from '../../assets/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('token');
    const newRequest = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept-Language': 'es-BO,en;q=0.8' // ,
        // 'Accept-Datetime':
        // 'Authorization': 'Basic ' + btoa(Constants.USUARIO + ':' + Constants.PASSWORD)
      }
    });
    return next
      .handle(newRequest)
      .do(succ => {
          // console.log(succ);
        }, err => {
          /*if (err.status === 401) {
            this.router.navigate(['/']);
          }*/
        // console.log(err);
        }
      );
  }
}


