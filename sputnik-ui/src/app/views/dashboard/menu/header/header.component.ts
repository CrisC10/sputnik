import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Constants} from '../../../../../assets/constants';
import {NotificacionesComponent} from '../../../../directives/notificaciones.component';
import {TiempoSesionComponent} from '../../../../directives/tiempoSesion.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() comprimirMenu: EventEmitter<any> = new EventEmitter();
  @BlockUI() blockUI: NgBlockUI;

  tituloProyecto = Constants.TITULO_PROYECTO;
  tituloModuloProyecto = Constants.TITULO_MODULO_PROYECTO;
  // usuarioNombre = localStorage.getItem('usuario');
  usuarioNombre = Constants.USUARIO;
  estadoMenu = true;
  pushRightClass = 'push-right';

  constructor(public router: Router,
              private notificaion: NotificacionesComponent,
              private tiempoSesion: TiempoSesionComponent) {
    this.router.events.subscribe(val => {
      if ( val instanceof NavigationEnd &&
           window.innerWidth <= 992 &&
           this.isToggled() ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() { }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
  cerrarSesion() {
    this.tiempoSesion.cerrarTiempoSession();
  }

  comprimirVentana() {
    this.toggleSidebar();
    this.estadoMenu = !this.estadoMenu;
    this.comprimirMenu.emit(this.estadoMenu);
  }
}
