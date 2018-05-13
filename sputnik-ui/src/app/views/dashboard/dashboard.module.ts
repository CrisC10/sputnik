import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {HeaderComponent} from './menu/header/header.component';
import {SidebarComponent} from './menu/sidebar/sidebar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BienvenidaComponent} from './bienvenida/bienvenida.component';
import {DndModule} from 'ng2-dnd';
import {SubheaderComponent} from './menu/subheader/subheader.component';
import {AuthInterceptor} from '../../interceptors/auth.interceptor';
import {NotificacionesComponent} from '../../directives/notificaciones.component';
import {TiempoSesionComponent} from '../../directives/tiempoSesion.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    NgbDropdownModule.forRoot(),
    DndModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    SubheaderComponent,
    BienvenidaComponent
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true
    },
    NotificacionesComponent,
    TiempoSesionComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }
