import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';



@Injectable()
export class MedioPagoService {
  constructor(private http: HttpClient) { }

  listaMedioPago(): Observable <RespuestaServidor<{}>> {
    return this.http.get<RespuestaServidor<{}>>(Constants.ENDPOINT_LISTA_MEDIO_PAGO);
  }

  listaMedioPagoId(idMedioPago): Observable <RespuestaServidor<{}>> {
    return this.http.get<RespuestaServidor<{}>>(Constants.ENDPOINT_LISTA_MEDIO_PAGO + '/' + idMedioPago);
  }

  actualizaCredenciales(idMedioPago, objCredenciales): Observable <RespuestaServidor<{}>> {
    objCredenciales.usernameService = objCredenciales.usernameService.trim();
    objCredenciales.passwordService = objCredenciales.passwordService.trim();
    return this.http.post<RespuestaServidor<{}>>(Constants.ENDPOINT_LISTA_MEDIO_PAGO + '/' + idMedioPago + '/credentials', objCredenciales);
  }

  asignaCanal(idMedioPago, idCanal): Observable <RespuestaServidor<{}>> {
    return this.http.put<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_MEDIO_PAGO + '/' + idMedioPago + '/canales/' + idCanal, {});
  }

  desasignaCanal(idMedioPago, idCanal): Observable <RespuestaServidor<{}>> {
    return this.http.delete<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_MEDIO_PAGO + '/' + idMedioPago + '/canales/' + idCanal, {});
  }
}
