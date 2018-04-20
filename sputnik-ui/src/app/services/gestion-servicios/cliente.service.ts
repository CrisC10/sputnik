import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';


@Injectable()
export class ClienteService {
  constructor(private http: HttpClient) { }

  listaClientes(pNit, pRazonSocial, usuario, password, canal): Observable <RespuestaServidor<{}>>  {
    const Authorization = 'Basic ' + btoa(usuario + ':' + password);

    return this.http.get<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_CLIENTES + '?nit=' + pNit + '&razonSocial=' + pRazonSocial +
      '&canal=' + canal + '&usuarioTransaccion=' + usuario,
      {
        headers: new HttpHeaders().set('Authorization', Authorization)
      }
    );
  }
}
