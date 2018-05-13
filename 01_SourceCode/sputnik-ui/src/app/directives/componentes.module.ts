import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {ValidarLetrasDirective} from './validarLetras.directive';
import {ValidarNumeroDirective} from './validarNumero.directive';
import {ValidarNoEditableDirective} from './validarNoEditable.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    ValidarLetrasDirective,
    ValidarNumeroDirective,
    ValidarNoEditableDirective
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ValidarLetrasDirective,
    ValidarNumeroDirective,
    ValidarNoEditableDirective
  ],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentesModule { }
