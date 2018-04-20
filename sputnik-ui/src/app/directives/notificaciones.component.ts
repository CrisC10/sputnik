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
    // console.log(pMensaje);
    // console.log(pTitulo);

    try {
      let vMensaje = null;

      if (pMensaje !== null && pMensaje !== '' && typeof (pMensaje) !== 'undefined') {
        if (pMensaje.message) {
          vMensaje = pMensaje.message;
        } else {
          vMensaje = 'No se pudo realizar la petición.';
        }
      }

      switch (pError) {
        case 400:
          this.toastr.warning(vMensaje, 'Advertencia');
          break;
        case 401:
          this.toastr.warning('Verifique Usuario o contraseña.', 'Advertencia');
          break;
        case 500:
          this.toastr.error('Ocurrió un error en ' + pTitulo, 'Error');
          break;
        default:
          this.toastr.error('Ocurrió un error en ' + pTitulo + ' comuniquese con el administrador.', 'Error');
          break;
      }
    } catch (e) {
      console.log('Error Inesperado', e)
      this.toastr.error('Ocurrió un error inesperado en ' + pTitulo + ' comuniquese con el administrador.', 'Error');
    }
  }

}
