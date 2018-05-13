import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';



@Injectable()
export class CanalService {
  constructor(private http: HttpClient) { }

  listaCanal(): Observable <RespuestaServidor<{}>> {
    return this.http.get<RespuestaServidor<{}>>(Constants.ENDPOINT_LISTA_CANAL);
  }

}
