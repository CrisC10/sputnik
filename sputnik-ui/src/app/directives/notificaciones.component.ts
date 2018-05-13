import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificacionesComponent {

  constructor(private toastr: ToastrService) { }

  success(pMensaje) {
    this.toastr.success(pMensaje, 'Éxito');
  }

  info(pTitulo, pMensaje) {
    this.toastr.info(pMensaje, pTitulo);
  }

  warning(pMensaje) {
    this.toastr.warning(pMensaje, 'Advertencia');
  }

  error(pMensaje) {
    this.toastr.error(pMensaje, 'Error');
  }

  errorServicio(pError, pMensaje, pTitulo) {
    // console.log(pError);
    // console.log('pMensaje', pMensaje);
    // console.log(pTitulo);

    try {
      let vMensaje = null;

      if (pMensaje.Message !== null && pMensaje.Message !== '' && typeof (pMensaje.Message) !== 'undefined') {
        // console.log(111);
        vMensaje = pMensaje.Message;
      } else {
        // console.log(222);
        if (pMensaje.message !== null && pMensaje.message !== '' && typeof (pMensaje.message) !== 'undefined') {
          // console.log(333);
          vMensaje = pMensaje.message;
        } else {
          // console.log(444);
          if (pMensaje.error !== null && pMensaje.error !== '' && typeof (pMensaje.error) !== 'undefined') {
            // console.log(555);
            vMensaje = pMensaje.error;
          } else {
            // console.log(666);
            if (pMensaje !== null && pMensaje !== '' && typeof (pMensaje) !== 'undefined') {
              // console.log(777);
              vMensaje = pMensaje;
            } else {
              // console.log(888);
              vMensaje = 'No se pudo realizar la petición.';
            }
          }
        }
      }

      // console.log('vMensaje', vMensaje);

      switch (pError) {
        case 400:
          this.toastr.warning(vMensaje, 'Advertencia');
          break;
        case 401:
          this.toastr.error('No tiene acceso a ' + pTitulo, 'Error');
          break;
        case 500:
          this.toastr.error(vMensaje, 'Error');
          break;
        default:
          this.toastr.error('Error comuniquese con el administrador - ' + pTitulo, 'Error');
          break;
      }
    } catch (e) {
      console.log('Error Inesperado', e)
      this.toastr.error('Error inesperado comuniquese con el administrador - ' + pTitulo, 'Error');
    }
  }

}
