import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class ImpresionDocumentosModule {
  @BlockUI() blockUI: NgBlockUI;

  constructor(private toastr: ToastrService) { }

  impresionPdf(pNombreArchivo, pBase64) {
    this.blockUI.start();

    const vUrlCompleta = 'data:application/pdf;base64,' + pBase64;
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = vUrlCompleta;
      link.download = pNombreArchivo + '_' + moment(moment.utc()).local().format('YYYYMMDDHHmmss') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.blockUI.stop();
    } else {
      window.open(vUrlCompleta);
      this.blockUI.stop();
    }
  }

  impresionExcel(pNombreArchivo, pBase64) {
    this.blockUI.start();

    const vUrlCompleta = 'data:application/vnd.ms-excel;base64,' + pBase64;
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = vUrlCompleta;
      link.download = pNombreArchivo + '_' + moment(moment.utc()).local().format('YYYYMMDDHHmmss') + '.xls';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.blockUI.stop();
    } else {
      window.open(vUrlCompleta);
      this.blockUI.stop();
    }
  }

  impresionDocumento(pNombreArchivo, pBase64, pMimeType) {
    this.blockUI.start();

    const vUrlCompleta = 'data:' + pMimeType + ';base64,' + pBase64;
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = vUrlCompleta;
      link.download = pNombreArchivo + '_' + moment(moment.utc()).local().format('YYYYMMDDHHmmss') + '.xls';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.blockUI.stop();
    } else {
      window.open(vUrlCompleta);
      this.blockUI.stop();
    }
  }


}








