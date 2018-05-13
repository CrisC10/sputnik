import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {SweetAlertService} from '../../../../assets/libreries/ngx-sweetalert2/src';
import {CanalService} from '../../../services/gestion-servicios/canal.service';
import {MedioPagoService} from '../../../services/gestion-servicios/medioPago.service';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';



@Component({
  selector: 'app-medioPago-modal',
  templateUrl: './asignarCanal.modal.html'
})

export class AsignarCanalModal implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() vObjRecibido: any;
  @Input() vModo: string;

  form: FormGroup;
  listaCanal: any = [];
  canal: any = null;
  vObjMedioPago: any = {};


  constructor( private canalService: CanalService,
               private medioPagoService: MedioPagoService,
               private notificacion: NotificacionesComponent,
               private swal: SweetAlertService,
               public modalActivo: NgbActiveModal) {}

  listarCanal () {
    this.blockUI.start();

    this.canalService.listaCanal().subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        console.log('Exito', respuestaServidor);

        this.listaCanal = respuestaServidor;
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

  listarMedioPago (vObjData) {
    this.blockUI.start();

    this.medioPagoService.listaMedioPagoId(vObjData.id).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.vObjMedioPago = respuestaServidor;
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, 'Al recuperar datos del medio de pago.', 'Datos Medio Pago'
        );
      }
    );
  }


  /*
  * Asignar Canal a Medio de Pago
  * */
  asignarCanal(pObjCanal) {
    this.medioPagoService.asignaCanal(this.vObjRecibido.id, pObjCanal.id).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.listarMedioPago(this.vObjRecibido);
        this.notificacion.success('Canal asignado correctamente.');
      },
      errorRespuestaServidor => {
        console.log(errorRespuestaServidor);
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'Asignar Canal'
        );
      }
    );
  }

  asignarAdvertencia(pObjCanal) {
    this.swal.confirm({
      title: '¿Está seguro de asignar el canal<br>' +
      '<span class="titulo-naranja">' + pObjCanal.codigo + ' - ' + pObjCanal.descripcion + '</span>' + '?',
      text: '',
      focusConfirm: false,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '&nbspAsignar&nbsp',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      confirmButtonClass: 'btn btn-guardar',
      cancelButtonClass: 'btn btn-cancelar',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.asignarCanal(pObjCanal);
      }
    });
  }


  /*
  * Desasignar Canal a Medio de Pago
  * */
  desasignarCanal(pObjCanal) {
    this.medioPagoService.desasignaCanal(this.vObjRecibido.id, pObjCanal.id).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.listarMedioPago(this.vObjRecibido);
        this.notificacion.success('Canal desasignado correctamente.');
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'Desasignar Canal'
        );
      }
    );
  }

  desasignarAdvertencia(pObjCanal) {
    this.swal.confirm({
      title: '¿Está seguro de desasignar el canal<br>' +
      '<span class="titulo-naranja">' + pObjCanal.codigo + ' - ' + pObjCanal.descripcion + '</span>' + '?',
      text: '',
      focusConfirm: false,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '&nbspDesasignar&nbsp',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      confirmButtonClass: 'btn btn-guardar',
      cancelButtonClass: 'btn btn-cancelar',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.desasignarCanal(pObjCanal);
      }
    });
  }



  ngOnInit() {
    this.listarCanal();
    this.listarMedioPago(this.vObjRecibido);
  }

  cerrarVentana() {
    this.modalActivo.dismiss();
  }
}
