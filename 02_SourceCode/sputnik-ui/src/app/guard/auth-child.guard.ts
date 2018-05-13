import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {RouterState} from '@angular/router/src/router_state';

@Injectable()
export class AuthChildGuard implements CanActivateChild {
  estaHabilitado = false;
  constructor(private router: Router) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /*if (JSON.parse(localStorage.getItem('objMenu'))) {
      const listaMenu = JSON.parse(localStorage.getItem('objMenu'));

      for (const objMenu of listaMenu) {
        for (const objHijo of objMenu.listRecursoHijos) {
          if (objHijo.url === state.url) {
            this.estaHabilitado = true;
          }
        }
      }
      if (this.router.url === '/login') {
        this.estaHabilitado = true;
      }
      if (!this.estaHabilitado) {
        // localStorage.clear();
        this.router.navigate(['/dashboard']);
      }
      // console.log('======STATE====')
      // console.log(state.url);
      // console.log('======ROUTE====')
      // console.log(this.router.url);
    }
    return this.estaHabilitado;*/

    return true;
  }
}
