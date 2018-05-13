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
    username: null,
    password: null
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

    this.loginSerive.login(pObjLogin).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('login', respuestaServidor);

        localStorage.setItem('userName', respuestaServidor.userName);
        localStorage.setItem('token_type', respuestaServidor.token_type);
        localStorage.setItem('access_token', respuestaServidor.access_token);

        this.notificaion.success('Bienvenido(a) a Sputnik');
        this.tiempoSesion.tiempoSession();
        this.router.navigate(['/']);
      },
      errorServidor => {
        console.log(errorServidor);
        this.blockUI.stop();
        this.notificaion.errorServicio(errorServidor.status, errorServidor.error, 'Login');
      }
    );
  }
}

