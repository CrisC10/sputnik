import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class PagoService {
  constructor(private http: HttpClient) { }

  pago(pCodAgrupador, pObjLocalizadores, usuario, password, canal): Observable <RespuestaServidor<{}>>  {
    const Authorization = 'Basic ' + btoa(usuario + ':' + password);
    const vFechaHoraPago = moment(moment.utc()).local().format();

    for (const obj of pObjLocalizadores) {
      obj.idTransaccion = moment.tz(moment(), 'America/La_Paz').format('YYYYMMDDHHmmss');
      obj.fecha = vFechaHoraPago;
      obj.nitCliente = obj.nit;
    }

    const vObjPago = {
      'localizadores': pObjLocalizadores,
      'usuarioTransaccion': usuario,
      'canal': canal
    };

    console.log('vObjPago', vObjPago);

    return this.http.put<RespuestaServidor<{}>>(
      Constants.ENDPOINT_REALIZAR_PAGO + '/' + pCodAgrupador + '/localizadores',
      vObjPago,
      {
        headers: new HttpHeaders().set('Authorization', Authorization)
      }
    );
  }
}
