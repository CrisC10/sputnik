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
    return listaDeObjeto.filter((objeto: any) => this.cumpleFiltro(objeto, parametro));
  }


  cumpleFiltro(objeto: any, parametro: any): boolean {
    for (const atributo in objeto) {

      // Filtramos Objetos
      if (typeof  objeto[atributo] === 'object') {
        for (const atributoObjeto in objeto[atributo]) {
          if (typeof objeto[atributo][atributoObjeto] === 'string') {
            if (objeto[atributo][atributoObjeto].toLowerCase().includes(parametro.toLowerCase())) {
              return true;
            }
          }
        }
      }

      if (atributo !== undefined) {
        // Filtramos Fechas
        if (atributo.includes('fecha')) {
          const nuevaFecha = moment(objeto[atributo]).format('DD/MM/YYYY') + '';
          if (nuevaFecha.includes(parametro)) {
            return true;
          }
        }


        // Filtramos Enteros
        if (typeof objeto[atributo] === 'number') {
          const nuevaNumero = objeto[atributo].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '';
          if (nuevaNumero.includes(parametro)) {
            return true;
          }
        }


        // Filtramos Cadenas
        if (typeof objeto[atributo] === 'string') {
          if (objeto[atributo].toLowerCase().includes(parametro.toLowerCase())) {
            return true;
          }
        }

        // Filtramos Booleanos
        if (typeof objeto[atributo] === 'boolean') {
          if (objeto[atributo]) {
            if ('ACTIVO'.length === parametro.length && 'ACTIVO'.toLowerCase().match(parametro.toLowerCase())) {
              return true;
            }
          }else {
            if ('INACTIVO'.length === parametro.length && 'INACTIVO'.toLocaleLowerCase().match(parametro.toLocaleLowerCase())) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
