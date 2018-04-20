import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';


@Injectable()
export class AgrupadorService {
  constructor(private http: HttpClient) { }

  listaAgrupador(codAgrupador, usuario, password, canal): Observable <RespuestaServidor<{}>>  {
    const Authorization = 'Basic ' + btoa(usuario + ':' + password);

    return this.http.get<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_AGRUPADORES + '/' + codAgrupador +
      '?canal=' + canal + '&usuarioTransaccion=' + usuario,
      {
        headers: new HttpHeaders().set('Authorization', Authorization)
      }
    );
  }

  listalocalizador(codLocalizador, usuario, password, canal): Observable <RespuestaServidor<{}>>  {
    const Authorization = 'Basic ' + btoa(usuario + ':' + password);

    return this.http.get<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_LOCALIZADORES + '/' + codLocalizador +
      '?canal=' + canal + '&usuarioTransaccion=' + usuario,
      {
        headers: new HttpHeaders().set('Authorization', Authorization)
      }
    );
  }

  listaAgrupadorLocalizador(codAgrupador, codLocalizador, usuario, password, canal): Observable <RespuestaServidor<{}>>  {
    const Authorization = 'Basic ' + btoa(usuario + ':' + password);

    return this.http.get<RespuestaServidor<{}>>(
      Constants.ENDPOINT_LISTA_AGRUPADORES_LOCALIZADORES + '/' + codAgrupador + '/localizadores/' + codLocalizador +
      '?canal=' + canal + '&usuarioTransaccion=' + usuario,
      {
        headers: new HttpHeaders().set('Authorization', Authorization)
      }
    );
  }
}
