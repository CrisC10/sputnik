import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthInterceptor} from '../../interceptors/auth.interceptor';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NotificacionesComponent} from '../../directives/notificaciones.component';
import {SweetAlertService} from '../../../assets/libreries/ngx-sweetalert2/src';
import {FiltroPipe} from '../../pipes/filtro.pipe';
import {FormatoFechaPipe} from '../../pipes/formatoFecha.pipe';
import {FormatoNumeroPipe} from '../../pipes/formatoNumero.pipe';
import {ComponentesModule} from '../../directives/componentes.module';
import {ImpresionDocumentosModule} from '../../directives/impresionDocumentos.module';

import {AdministracionComponent} from './administracion.component';
import {AdministracionRoutingModule} from './administracion-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AdministracionRoutingModule,
    ComponentesModule
  ],
  declarations: [
    FiltroPipe,
    FormatoFechaPipe,
    FormatoNumeroPipe,
    AdministracionComponent
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    NotificacionesComponent,
    SweetAlertService,
    ImpresionDocumentosModule
  ],
  bootstrap: [
    AdministracionComponent
  ],
  exports: [
    FiltroPipe,
    FormatoFechaPipe
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdministracionModule { }
