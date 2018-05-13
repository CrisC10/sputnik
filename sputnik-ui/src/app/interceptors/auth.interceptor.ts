import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {NotificacionesComponent} from '../directives/notificaciones.component';
import {TiempoSesionComponent} from '../directives/tiempoSesion.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router,
              private notificacion: NotificacionesComponent,
              private tiempoSesion: TiempoSesionComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': 'en-US,en;q=0.8',
        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
      }
    });
    return next
      .handle(newRequest)
      .do(succ => {
          // console.log(succ);
        }, err => {
          if (err.status === 401) {
            //this.router.navigate(['/']);
            this.tiempoSesion.cerrarSessionExpirada();
          }
        }
      );
  }
}


