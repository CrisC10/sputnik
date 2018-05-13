import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Constants} from '../../../assets/constants';
import {RespuestaServidor} from '../../models/generic-response';
import * as moment from 'moment';

import {ConciliacionesModel} from '../../models/conciliaciones.model';


@Injectable()
export class ConciliacionesService {
  constructor(private http: HttpClient) { }

  listaConciliaciones(pCodigoAgrupador, pFechaDesde, pFechaHasta, pIdCanal, pIdMedioPago): Observable <RespuestaServidor<ConciliacionesModel>> {
    let cont = 0;
    let tenpUrl = '?';

    if (pCodigoAgrupador !== null && pCodigoAgrupador !== '' && typeof (pCodigoAgrupador) !== 'undefined') {
      tenpUrl = tenpUrl + 'codigoAgrupador=' + pCodigoAgrupador;
      cont = cont + 1;
    }

    if ((pFechaDesde !== null && pFechaDesde !== '' && typeof (pFechaDesde) !== 'undefined') &&
      (pFechaHasta !== null && pFechaHasta !== '' && typeof (pFechaHasta) !== 'undefined')) {

      if (cont > 0) {
        tenpUrl = tenpUrl + '&fechaDesde=' + moment(moment.utc(pFechaDesde)).local().format('YYYY-MM-DD') +
          '&fechaHasta=' + moment(moment.utc(moment(pFechaHasta))).local().format('YYYY-MM-DD');
      } else {
        tenpUrl = tenpUrl + 'fechaDesde=' + moment(moment.utc(pFechaDesde)).local().format('YYYY-MM-DD') +
          '&fechaHasta=' + moment(moment.utc(moment(pFechaHasta))).local().format('YYYY-MM-DD');
      }
      cont = cont + 1;
    }

    if (pIdMedioPago !== null && pIdMedioPago !== '' && typeof (pIdMedioPago) !== 'undefined') {
      if (cont > 0) {
        tenpUrl = tenpUrl + '&idMedioPago=' + pIdMedioPago.id;
      } else {
        tenpUrl = tenpUrl + 'idMedioPago=' + pIdMedioPago.id;
      }
      cont = cont + 1;
    }

    if (pIdCanal !== null && pIdCanal !== '' && typeof (pIdCanal) !== 'undefined') {
      if (cont > 0) {
        tenpUrl = tenpUrl + '&idCanal=' + pIdCanal.id;
      } else {
        tenpUrl = tenpUrl + 'idCanal=' + pIdCanal.id;
      }
    }

    return this.http.get<RespuestaServidor<ConciliacionesModel>>(Constants.ENDPOINT_LISTA_CONCILIACIONES + tenpUrl
    );
  }
}
