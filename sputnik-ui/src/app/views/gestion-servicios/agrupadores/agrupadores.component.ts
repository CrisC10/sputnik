import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {SweetAlertService} from '../../../../assets/libreries/ngx-sweetalert2/src';
import * as moment from 'moment';
import 'moment-timezone';
import {Constants} from '../../../../assets/constants';

import {AgrupadorService} from '../../../services/gestion-servicios/agrupador.service';
import {PagoService} from '../../../services/gestion-servicios/pago.service';
import {AgrupadorJson} from '../../../models/jsonPruebas/agrupadorJson';


@Component({
  selector: 'app-agrupadores',
  templateUrl: './agrupadores.component.html'
})

export class AgrupadoresComponent implements OnInit {
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

  rdTipoAgrupador: any;
  codigoAgrupador: any = null;
  codigoLocalizador: any = null;

  cantFilas = 0;

  constructor(
    private modal: NgbModal,
    private agrupadorService: AgrupadorService,
    private pagoService: PagoService,
    private notificaion: NotificacionesComponent,
    private swal: SweetAlertService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.rdTipoAgrupador = '1';
  }

  limpiarDatos() {
    this.rdTipoAgrupador = '1';
    this.codigoAgrupador = null;
    this.codigoLocalizador = null;
    this.listaObjeto = [];
  }

  llamarServicios() {
    this.cantFilas = 0;
    this.listaObjeto = [];
    this.blockUI.start();

    /*console.log('AgrupadorJson', AgrupadorJson);
    this.listaObjeto = AgrupadorJson.Content;
    this.cantFilas = this.listaObjeto.localizadores.length;
    this.blockUI.stop();*/

    if (this.rdTipoAgrupador === '1') {
      this.agrupadorService.listaAgrupador(this.codigoAgrupador, this.usuario, this.password, this.canal).subscribe(
        respuestaServidor => {
          this.blockUI.stop();
          console.log('Exito agrupador', respuestaServidor);

          this.listaObjeto = respuestaServidor;
          this.cantFilas = this.listaObjeto.localizadores.length;

          this.notificaion.success('Se realizó la búsqueda por Agrupador correctamente.');
        },
        errorRespuestaServidor => {
          this.blockUI.stop();
          console.log('Error', errorRespuestaServidor);
          this.notificaion.errorServicio(errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda por Agrupador');
        }
      );
    }

    if (this.rdTipoAgrupador === '2') {
      this.agrupadorService.listalocalizador(this.codigoLocalizador, this.usuario, this.password, this.canal).subscribe(
        respuestaServidor => {
          this.blockUI.stop();
          console.log('Exito localizador', respuestaServidor);
          this.listaObjeto = respuestaServidor;
          this.cantFilas = this.listaObjeto.localizadores.length;

          this.notificaion.success('Se realizó la búsqueda por Localizador correctamente.');
        },
        errorRespuestaServidor => {
          this.blockUI.stop();
          console.log('Error', errorRespuestaServidor);
          this.notificaion.errorServicio(errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda por Localizador');
        }
      );
    }

    if (this.rdTipoAgrupador === '3') {
      this.agrupadorService.listaAgrupadorLocalizador(
        this.codigoAgrupador, this.codigoLocalizador, this.usuario, this.password, this.canal
      ).subscribe(
        respuestaServidor => {
          this.blockUI.stop();
          console.log('Exito ambos', respuestaServidor);
          this.listaObjeto = respuestaServidor;
          this.cantFilas = this.listaObjeto.localizadores.length;

          this.notificaion.success('Se realizó la búsqueda por Agrupador - Localizador correctamente.');
        },
        errorRespuestaServidor => {
          this.blockUI.stop();
          console.log('Error', errorRespuestaServidor);
          this.notificaion.errorServicio(
            errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda por Agrupador - Localizador'
          );
        }
      );
    }
  }

  pagar(pCodAgrupador, pObjLocalizadores) {
    this.blockUI.start();

    this.pagoService.pago(pCodAgrupador, pObjLocalizadores, this.usuario, this.password, this.canal).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('Exito', respuestaServidor);

        this.limpiarDatos();
        this.notificaion.success('El pago se registró correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        console.log('Error', errorRespuestaServidor);

        this.notificaion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda por Agrupador - Localizador'
        );
      }
    );
  }

  pagarAdvertencia( pCodAgrupador, pObjLocalizadores) {

    this.swal.confirm({
      title: '¿Está seguro de realizar el pago, cod. Agrupador <br>' +
      '<span style="color:#EC971F; font-size:20px;">' + pCodAgrupador + '</span>' + '?',
      text: '',
      focusConfirm: false,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '&nbsp;&nbsp;&nbsp;Pagar&nbsp;&nbsp;&nbsp;',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      confirmButtonClass: 'btn btn-confirm-swal',
      cancelButtonClass: 'btn btn-cancel-swal',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.pagar(pCodAgrupador, pObjLocalizadores);
        console.log('Pagar', pCodAgrupador, ' - ', pObjLocalizadores);
      }
    });
  }
}


