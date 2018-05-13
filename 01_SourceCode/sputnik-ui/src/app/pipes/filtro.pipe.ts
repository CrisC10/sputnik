import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  transform(listaDeObjeto: any[], parametro: any): any {
    if (parametro === undefined) {
      return listaDeObjeto;
    }

    const listaFinal: any = [];

    let cont = 0;
    let cont2 = 0;
    const this2 = this;
    listaDeObjeto.forEach(function (value, key) {
      cont2 = 0;
      for (const atributo in value) {
        if (Array.isArray(value[atributo])) {
          value[atributo].forEach(function (value2, key2) {
            if (this2.cumpleFiltro(value2, parametro)) {
              cont2 = cont2 + 1;
            }
          });
        } else {
          if (this2.cumpleFiltro(value, parametro)) {
            cont2 = cont2 + 1;
          }
        }
      }

      if (cont2 > 0) {
        listaFinal[cont] = value;
        cont = cont + 1;
      }
    });
    // return listaDeObjeto.filter((objeto: any) => this.cumpleFiltro(objeto, parametro));
    return listaFinal;
  }


  cumpleFiltro(objeto: any, parametro: any): boolean {
    for (const atributo in objeto) {
      if (atributo !== undefined) {

        // Filtramos Fechas
        if (objeto[atributo].toString().length > 10 && moment(objeto[atributo]).isValid()) {
          const nuevaFecha = moment(objeto[atributo]).format('DD/MM/YYYY HH:mm:ss') + '';
          if (nuevaFecha.includes(parametro)) {
            return true;
          }
        }

        // Filtramos Cadenas
        if (typeof objeto[atributo] === 'string') {
          if (objeto[atributo].toLowerCase().includes(parametro.toLowerCase())) {
            return true;
          }
        }

        // Filtramos Enteros
        if (typeof objeto[atributo] === 'number') {
          // const nuevoNumero = parseFloat( objeto[atributo]).toFixed(2);
          let nuevoNumero: any;
          nuevoNumero = Number(objeto[atributo]).toFixed(2) ;
          nuevoNumero = nuevoNumero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          if (nuevoNumero.toString().includes(parametro)) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
