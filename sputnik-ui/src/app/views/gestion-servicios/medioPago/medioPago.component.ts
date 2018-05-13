import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {SweetAlertService} from '../../../../assets/libreries/ngx-sweetalert2/src';

import {CanalService} from '../../../services/gestion-servicios/canal.service';
import {MedioPagoService} from '../../../services/gestion-servicios/medioPago.service';
import {AsignarCanalModal} from './asignarCanal.modal';
import {CredencialesMedioPagoModal} from './credencialesMedioPago.modal';


@Component({
  selector: 'app-medioPago',
  templateUrl: './medioPago.component.html'
})

export class MedioPagoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  form: FormGroup;
  vOpcionesModal: NgbModalOptions = {};
  filtroDeBusqueda: string;
  maxPage: any = 10;
  pagina: any = 1;
  listaMedioPago: any = [];
  cantFilas = 0;

  constructor(
    private modal: NgbModal,
    private canalService: CanalService,
    private medioPagoService: MedioPagoService,
    private notificacion: NotificacionesComponent,
    private swal: SweetAlertService) { }


  listarMediosPago() {
    this.blockUI.start();

    this.medioPagoService.listaMedioPago().subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('Exito', respuestaServidor);

        this.listaMedioPago = respuestaServidor;
        this.cantFilas = this.listaMedioPago.length;
        this.notificacion.success('Medios de pago listados correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, 'Al listar medios de pago', 'Lista Medios de Pago'
        );
      }
    );
  }


  asignarCanal(pObjData) {
    console.log('pObjMedioPago', pObjData);

    const modalRef = this.modal.open(AsignarCanalModal, this.vOpcionesModal);
    modalRef.componentInstance.vObjRecibido = pObjData;
    modalRef.componentInstance.vModo = 'editar';

    modalRef.result.then(
      (objRespuesta) => {
        console.log('objRespuesta', objRespuesta);
      },
      (cancelar) => {
        console.log('cancelar', cancelar);
        this.listarMediosPago();
      }
    );
  }


  editarCredenciales(pObjData) {
    console.log('pObjMedioPago', pObjData);

    const modalRef = this.modal.open(CredencialesMedioPagoModal, this.vOpcionesModal);
    modalRef.componentInstance.vObjRecibido = pObjData;
    modalRef.componentInstance.vModo = 'editar';

    modalRef.result.then(
      (objRespuesta) => {
        console.log('objRespuesta', objRespuesta);
        this.listarMediosPago();
      },
      (cancelar) => {
        console.log('cancelar', cancelar);
        this.listarMediosPago();
      }
    );
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.vOpcionesModal.backdrop = 'static';
    this.vOpcionesModal.keyboard = false;

    this.listarMediosPago();
  }

}


