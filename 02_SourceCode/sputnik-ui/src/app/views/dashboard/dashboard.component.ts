import { Component, OnInit } from '@angular/core';
import {TiempoSesionComponent} from '../../directives/tiempoSesion.component';

/**
 * Creado por MC4
 * MC4 - SPT
 *
 * @author: Grover Callisaya Apaza
 * @email: gcallisaya@mc4.com.bo
 * @date: 20/12/2017
 * @copyright: MC4 - SPT
 *
 **/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'DASHBOARD';
  estaComprimido: boolean;

  constructor( private tiempoSesion: TiempoSesionComponent ) {}

  ngOnInit() {
    this.tiempoSesion.tiempoSession();
  }

  comprimirMenu(estado) {
    this.estaComprimido = estado;
  }
}
