import {Component, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {SweetAlertService} from '../../../../assets/libreries/ngx-sweetalert2/src';
import {CanalService} from '../../../services/gestion-servicios/canal.service';
import {MedioPagoService} from '../../../services/gestion-servicios/medioPago.service';
import {NotificacionesComponent} from '../../../directives/notificaciones.component';



@Component({
  selector: 'app-credencialesMedioPago-modal',
  templateUrl: './credencialesMedioPago.modal.html'
})

export class CredencialesMedioPagoModal implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() vObjRecibido: any;
  @Input() vModo: string;

  form: FormGroup;
  vObjMedioPago: any = {};

  vObjCredenciales: any = {
    usernameService: null,
    passwordService: null
  };

  vConfirmacion: any = null;


  constructor( private canalService: CanalService,
               private medioPagoService: MedioPagoService,
               private notificacion: NotificacionesComponent,
               private swal: SweetAlertService,
               public modalActivo: NgbActiveModal) {}


  listarMedioPago (vObjData) {
    this.blockUI.start();

    this.medioPagoService.listaMedioPagoId(vObjData.id).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.vObjMedioPago = respuestaServidor;
        this.vObjCredenciales.usernameService = this.vObjMedioPago.usernameService;
        // this.vObjCredenciales.passwordService = this.vObjMedioPago.passwordService;
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, 'Al recuperar datos medio de pago', 'Datos Medio Pago'
        );
      }
    );
  }


  /*
  * Guardar Credenciales Medio de Pago
  * */
  guardar() {
    this.medioPagoService.actualizaCredenciales(this.vObjRecibido.id, this.vObjCredenciales).subscribe(
      respuestaServidor => {
        this.blockUI.stop();
        this.listarMedioPago(this.vObjRecibido);
        this.notificacion.success('Credenciales actualizadas correctamente.');
        this.modalActivo.close(respuestaServidor);
      },
      errorRespuestaServidor => {
        this.blockUI.stop();
        this.notificacion.errorServicio(
          errorRespuestaServidor.status, errorRespuestaServidor.error, 'actualizar credenciales'
        );
      }
    );
  }

  guardarAdvertencia() {
    this.swal.confirm({
      title: '¿Está seguro de actualizar las credenciales de <br>' +
      '<span style="color:#EC971F; font-size:20px;">' + this.vObjRecibido.descripcion + '</span>' + '?',
      text: '',
      focusConfirm: false,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '&nbspGuardar&nbsp',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      confirmButtonClass: 'btn btn-guardar',
      cancelButtonClass: 'btn btn-cancelar',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.guardar();
      }
    });
  }


  ngOnInit() {
    this.listarMedioPago(this.vObjRecibido);
  }

  cerrarVentana() {
    this.modalActivo.dismiss();
  }
}
