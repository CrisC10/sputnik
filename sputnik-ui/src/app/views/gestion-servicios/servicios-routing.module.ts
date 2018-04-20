import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiciosComponent} from './servicios.component';

import {AgrupadoresComponent} from './agrupadores/agrupadores.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ConciliacionesComponent} from './conciliaciones/conciliaciones.component';


const routes: Routes = [
  { path: '', component: ServiciosComponent },
  { path: 'agrupador', component: AgrupadoresComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'conciliacion', component: ConciliacionesComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {}
