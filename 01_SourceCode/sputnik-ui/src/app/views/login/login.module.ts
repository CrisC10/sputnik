import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LoginRoutingModule} from './login-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NotificacionesComponent} from '../../directives/notificaciones.component';
import {TiempoSesionComponent} from '../../directives/tiempoSesion.component';
import {ComponentesModule} from '../../directives/componentes.module';

import {LoginService} from '../../services/login/login.service';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ComponentesModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
    NotificacionesComponent,
    TiempoSesionComponent
  ],
  bootstrap: [
    LoginComponent
  ],
  exports: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LoginModule {

}
