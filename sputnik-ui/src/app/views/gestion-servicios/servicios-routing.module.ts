import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiciosComponent} from './servicios.component';

import {MedioPagoComponent} from './medioPago/medioPago.component';
import {ConciliacionesComponent} from './conciliaciones/conciliaciones.component';


const routes: Routes = [
  { path: '', component: ServiciosComponent },
  { path: 'medioPago', component: MedioPagoComponent },
  { path: 'conciliacion', component: ConciliacionesComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {}
