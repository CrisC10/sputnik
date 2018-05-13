import {Injectable} from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {NotificacionesComponent} from './notificaciones.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {NavigationEnd, Router} from '@angular/router';
import {Constants} from '../../assets/constants';
import {LoginService} from '../services/login/login.service';

@Injectable()
export class TiempoSesionComponent {
  @BlockUI() blockUI: NgBlockUI;

  constructor(private idle: Idle,
              private notificacion: NotificacionesComponent,
              public router: Router,
              private loginService: LoginService) { }

  tiempoSession() {
    console.log('Iniciando tiempo sesion');

    this.idle.stop();
    this.idle.ngOnDestroy();

    this.idle.setIdle(5); // tiempo de espera antes de inciar conteo
    this.idle.setTimeout(Constants.TIEMPO_INACTIVIDAD_MINUTOS * 60); // tiempo de sesion
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    /*this.idle.onIdleEnd.subscribe(() => {
      console.log('Sigue viva la sesion 11');
    });*/

    /*this.idle.onIdleStart.subscribe(() => {
      console.log('Sigue viva la sesion 22');
    });*/

    this.idle.onTimeoutWarning.subscribe((countdown: number) => {
      // console.log('Timeout Warning - ' + countdown);
    });

    this.idle.onTimeout.subscribe(() => {
      this.cerrarSessionExpirada();
      /*localStorage.clear();
      this.blockUI.start();
      this.notificacion.warning('Su sessión a expirado');
      this.router.navigate(['/login']);*/

    });

    this.idle.watch();
  }

  cerrarTiempoSession() {
    this.blockUI.start();

    this.loginService.logout().subscribe(
      respuestaServidor => {
        this.blockUI.stop();

        this.idle.stop();
        this.idle.ngOnDestroy();
        localStorage.clear();
        this.notificacion.success('Sesión cerrada correctamente');
        this.router.navigate(['/login']);

      },
      errorServidor => {
        this.blockUI.stop();

        this.idle.stop();
        this.idle.ngOnDestroy();
        localStorage.clear();
        this.notificacion.success('Sesión cerrada correctamente');
        this.router.navigate(['/login']);
      }
    );
  }

  cerrarSessionExpirada() {
    this.blockUI.start();

    this.loginService.logout().subscribe(
      respuestaServidor => {
        this.blockUI.stop();

        this.idle.stop();
        this.idle.ngOnDestroy();
        localStorage.clear();
        this.notificacion.success('Su sessión a expirado');
        this.router.navigate(['/login']);

      },
      errorServidor => {
        this.blockUI.stop();

        this.idle.stop();
        this.idle.ngOnDestroy();
        localStorage.clear();
        this.notificacion.success('Su sessión a expirado');
        this.router.navigate(['/login']);
      }
    );
  }
}
