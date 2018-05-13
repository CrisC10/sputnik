import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';
import {ImpresionDocumentosModule} from '../../../directives/impresionDocumentos.module';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormatosFecha} from '../../../models/fecha-formato';
import * as moment from 'moment';
import 'moment-timezone';

import {CanalService} from '../../../services/gestion-servicios/canal.service';
import {MedioPagoService} from '../../../services/gestion-servicios/medioPago.service';
import {ConciliacionesService} from '../../../services/gestion-servicios/conciliaciones.service';
import {ConciliacionesModel} from '../../../models/conciliaciones.model';
import {MatDatepickerInputEvent} from '@angular/material';


@Component({
  selector: 'app-conciliaciones',
  templateUrl: './conciliaciones.component.html',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: FormatosFecha},
  ]
})

export class ConciliacionesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  filtroDeBusqueda: string;
  form: FormGroup;
  maxPage: any = 10;
  pagina: any = 1;

  listaObjeto: any = new ConciliacionesModel();

  codigoAgrupador: any = null;
  fechaDesde: any =  moment().subtract(1, 'months');
  fechaMinimaDesde = new Date(2000, 0, 0);
  fechaMaximaDesde = new Date();

  fechaHasta: any = moment();
  fechaMinimaHasta = new Date(2000, 0, 0);
  fechaMaximaHasta = new Date();

  canal: any = null;
  medioPago: any = null;

  vObjCanal: any = [];
  vObjMedioPago: any = [];
  cantFilas = 0;

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  constructor(
    private modal: NgbModal,
    private canalService: CanalService,
    private medioPagoService: MedioPagoService,
    private conciliacionesService: ConciliacionesService,
    private notificacion: NotificacionesComponent,
    private impresion: ImpresionDocumentosModule) { }



  listarCanal () {
    this.blockUI.start();

    this.canalService.listaCanal().subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.vObjCanal = respuestaServidor;
        this.notificacion.success('Canal listado correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, 'Error al listar canal.', 'Lista Canal'
        );
      }
    );
  }


  listarMedioPago () {
    this.blockUI.start();

    this.medioPagoService.listaMedioPago().subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.vObjMedioPago = respuestaServidor;
        this.notificacion.success('Medio de Pago listado correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, 'Error al listar canal.', 'Lista Medio de Pago'
        );
      }
    );
  }

  doSomething(event) {
    console.log('event', event); // logs model value

    console.log(this.fechaDesde);

    this.fechaDesde = null;
    this.fechaHasta = null;
  }


  validarFecha(pFechaDesde) {
    const fechaDesde = pFechaDesde;

    const c = moment(this.fechaDesde, 'D/MM/YYYY').format('YYYY-MM-DD');
    const d = moment(this.fechaHasta, 'DD/MM/YYYY').format('YYYY-MM-DD');

    if (d < c) {
      this.fechaHasta = null;
    }

    const dia = moment(fechaDesde).format('DD');
    const mes = moment(fechaDesde).format('MM');
    const anio = moment(fechaDesde).format('YYYY');
    this.fechaMinimaHasta = new Date(+anio, +mes - 1, +dia);
  }

  limpiarDesde() {
    this.fechaDesde = null;
  }

  limpiarHasta() {
    this.fechaHasta = null;
  }


  llamarServicios() {
    this.listaObjeto = new ConciliacionesModel();
    this.cantFilas = 0;
    this.blockUI.start();

    this.conciliacionesService.listaConciliaciones(
      this.codigoAgrupador,
      this.fechaDesde,
      this.fechaHasta,
      this.canal,
      this.medioPago
    ).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.listaObjeto = respuestaServidor;

        if (this.listaObjeto.conciliaciones.length > 0) {
          this.notificacion.success('Búsqueda Conciliaciones');
          this.cantFilas = this.listaObjeto.conciliaciones.length;
        } else {
          this.notificacion.warning('No se encontraron registros.');
          this.cantFilas = 0;
        }
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda Conciliaciones'
        );
      }
    );
  }

  impresionDocumento(pTipo) {
    if (pTipo === 'PDF') {
      this.impresion.impresionPdf('Conciliaciones', this.listaObjeto.base64Pdf);
    }

    if (pTipo === 'XLS') {
      this.impresion.impresionExcel('Conciliaciones', this.listaObjeto.base64Excel);
    }
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.listarCanal();
    this.listarMedioPago();
  }
}
