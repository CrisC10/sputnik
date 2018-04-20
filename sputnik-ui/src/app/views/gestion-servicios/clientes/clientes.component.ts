import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';
import {SweetAlertService} from '../../../../assets/libreries/ngx-sweetalert2/src';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import * as moment from 'moment';
import 'moment-timezone';
import {Constants} from '../../../../assets/constants';

import {ClienteService} from '../../../services/gestion-servicios/cliente.service';
import {PagoService} from '../../../services/gestion-servicios/pago.service';
import {ClienteJson} from '../../../models/jsonPruebas/clienteJson';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit {
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

  nitCliente: any = null;
  razonSocial: any = null;
  cantFilas = 0;

  constructor(
    private modal: NgbModal,
    private clientesService: ClienteService,
    private pagoService: PagoService,
    private notificaion: NotificacionesComponent,
    private swal: SweetAlertService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  llamarServicios() {
    this.cantFilas = 0;
    this.listaObjeto = [];
    this.blockUI.start();

    /*console.log('ClienteJson', ClienteJson);
    this.listaObjeto = ClienteJson.Content;
    this.cantFilas = this.listaObjeto.length;
    this.blockUI.stop();*/

    if (this.nitCliente === null) {
      this.nitCliente = '';
    }

    if (this.razonSocial === null) {
      this.razonSocial = '';
    }

    this.clientesService.listaClientes(this.nitCliente, this.razonSocial, this.usuario, this.password, this.canal).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('Exito', respuestaServidor);

        this.listaObjeto = respuestaServidor;
        this.notificaion.success('Se realizó la búsqueda por Cliente correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        console.log('Error', errorRespuestaServidor);

        this.notificaion.errorServicio(errorRespuestaServidor.status, errorRespuestaServidor.error, 'Busqueda Cliente(s)');
      }
    );
  }

  pagar(pCodAgrupador, pObjLocalizadores) {
    this.blockUI.start();

    this.pagoService.pago(pCodAgrupador, pObjLocalizadores, this.usuario, this.password, this.canal).subscribe(
      respuestaServidor => {
        this.blockUI.stop();

        this.llamarServicios();
        console.log('Exito', respuestaServidor);

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
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      focusConfirm: false
    }).then((result) => {
      if (result.value) {
        this.pagar(pCodAgrupador, pObjLocalizadores);
        console.log('Pagar', pCodAgrupador, ' - ', pObjLocalizadores);
      }
    });
  }
}
