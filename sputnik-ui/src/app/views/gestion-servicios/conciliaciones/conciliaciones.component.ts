import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import * as moment from 'moment';
import 'moment-timezone';
import {Constants} from '../../../../assets/constants';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {ConciliacionesService} from '../../../services/gestion-servicios/conciliaciones.service';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-conciliaciones',
  templateUrl: './conciliaciones.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class ConciliacionesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  filtroDeBusqueda: string;
  form: FormGroup;
  pagina: any = 1;
  listaObjeto: any = [];

  usuario: any = null;
  password: any = null;
  canal: any = null;
  vObjCanal: any = [
    {
      'codigo': 'ATM',
      'descripcion': 'Cajero Automático'
    },
    {
      'codigo': 'IBK',
      'descripcion': 'Banca por Internet'
    },
    {
      'codigo': 'BMV',
      'descripcion': 'Banca Movil'
    },
    {
      'codigo': 'CJS',
      'descripcion': 'Cajas'
    }
  ];

  fechaMinima = new Date(2000, 0, 0);
  fechaConciliacion: any = null;

  cantFilas = 0;

  constructor(
    private modal: NgbModal,
    private conciliacionesService: ConciliacionesService,
    private notificaion: NotificacionesComponent) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  llamarServicios() {
    this.cantFilas = 0;
    this.listaObjeto = [];
    this.blockUI.start();

    const vFecha = moment(this.fechaConciliacion).format('YYYY-MM-DD');

    this.conciliacionesService.listaConciliaciones(vFecha, this.usuario, this.password, this.canal).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('Exito', respuestaServidor);

        this.listaObjeto = respuestaServidor;
        this.notificaion.success('Busqueda Conciliaciones');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        console.log('Error', errorRespuestaServidor);

        this.notificaion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda Conciliaciones'
        );
      }
    );
  }
}
