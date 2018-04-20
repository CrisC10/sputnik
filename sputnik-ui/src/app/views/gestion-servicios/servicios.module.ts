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
import {ComponentesModule} from '../../directives/componentes.module';

import {ServiciosComponent} from './servicios.component';
import {ServiciosRoutingModule} from './servicios-routing.module';

import {AgrupadoresComponent} from './agrupadores/agrupadores.component';
import {AgrupadorService} from '../../services/gestion-servicios/agrupador.service';

import {ClientesComponent} from './clientes/clientes.component';
import {ClienteService} from '../../services/gestion-servicios/cliente.service';

import {ConciliacionesComponent} from './conciliaciones/conciliaciones.component';
import {ConciliacionesService} from '../../services/gestion-servicios/conciliaciones.service';

import {PagoService} from '../../services/gestion-servicios/pago.service';

import {TabsModule} from 'ngx-bootstrap';
import {PaginationModule} from 'ngx-bootstrap';
import {Ng2TableModule} from 'ng2-table/ng2-table';
// import {NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective} from 'ng2-table/ng2-table';


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
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    Ng2TableModule,
    // NgTableComponent,
    // NgTableFilteringDirective,
    // NgTablePagingDirective,
    // NgTableSortingDirective,
    ServiciosRoutingModule,
    ComponentesModule
  ],
  declarations: [
    FiltroPipe,
    ServiciosComponent,
    AgrupadoresComponent,
    ClientesComponent,
    ConciliacionesComponent
  ],
  providers: [
    AgrupadorService,
    ClienteService,
    ConciliacionesService,
    PagoService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    NotificacionesComponent,
    SweetAlertService
  ],
  bootstrap: [
    ServiciosComponent,
    AgrupadoresComponent,
    ClientesComponent,
    ConciliacionesComponent
  ],
  exports: [
    FiltroPipe
  ],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ServiciosModule { }
