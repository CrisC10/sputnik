import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, NgForm} from '@angular/forms';
import {NotificacionesComponent} from '../../directives/notificaciones.component';
import {TiempoSesionComponent} from '../../directives/tiempoSesion.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

import {LoginService} from '../../services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('loginForm')
  form: FormGroup;

  vObjLogin: any = {
    'usuario': null,
    'password': null
  };

  constructor(public router: Router,
              private loginSerive: LoginService,
              private notificaion: NotificacionesComponent,
              private tiempoSesion: TiempoSesionComponent) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.blockUI.stop();
  }

  public onLoggedin(pObjLogin) {
    this.blockUI.start();

    console.log('pObjLogin', pObjLogin);

    localStorage.setItem('usuario', 'usuarioUno');
    localStorage.setItem('token', 'xGFzUSDFJlDFGFDG5A9aFR5N1VBd1JyXX==');

    this.notificaion.success('Bienvenido a pasarela de pagos');
    this.tiempoSesion.tiempoSession();
    console.log('localStorage', localStorage);
    this.router.navigate(['/']);
    this.blockUI.stop();

    /*this.loginSerive.loginFromEndpoint(pObjLogin).subscribe(
      respuestaServidor => {
        this.blockUI.stop();

        localStorage.setItem('token', respuestaServidor.objeto.token);
        localStorage.setItem('usuario', respuestaServidor.objeto.usuario);
        // localStorage.setItem('objMenu', JSON.stringify(respuestaServidor.objeto.menu));
        // localStorage.setItem('permisos', JSON.stringify(respuestaServidor.objeto.permisos));

        this.notificaion.success('Bienvenido a pasarela de pagos');
        this.router.navigate(['/']);

      },
      errorServidor => {
        this.blockUI.stop();
        this.notificaion.errorServicio(errorServidor.status, errorServidor.error, 'Login');
      }
    );*/
  }
}

