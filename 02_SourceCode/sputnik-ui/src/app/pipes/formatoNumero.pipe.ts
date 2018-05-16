import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'formatoNumero'
})
export class FormatoNumeroPipe implements PipeTransform {
  transform(pNumero: any[], pOptions: any): any {

    let pCantDecimales = pOptions.cantDeciamles;
    let pSepDecimal = pOptions.sepDecimales;
    let pSepMiles = pOptions.sepMiles;
    let nuevoNumero: any;

    if (pCantDecimales === undefined || pCantDecimales === '' || pCantDecimales === null) {
      pCantDecimales = 2;
    }

    if (pSepDecimal === undefined || pSepDecimal === '' || pSepDecimal === null) {
      pSepDecimal = '.';
    }

    if (pSepMiles === undefined || pSepMiles === '' || pSepMiles === null) {
      pSepMiles = ',';
    }

    nuevoNumero = Number(pNumero).toFixed( parseInt(pCantDecimales, 10) ) ;
    nuevoNumero = nuevoNumero.replace(pSepMiles, pSepDecimal);
    nuevoNumero = nuevoNumero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, pSepMiles);

    return nuevoNumero;
  }
}
