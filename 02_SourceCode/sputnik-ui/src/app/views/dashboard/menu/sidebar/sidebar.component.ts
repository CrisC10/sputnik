import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges{
  isActive = true;
  mostrarMenu = '';
  listaMenu: any = [];
  pushRightClass = 'push-right';

  @Input() estadoMenu: boolean;

  constructor() {
    // console.log(localStorage.getItem('objMenu'));
    // this.listaMenu = JSON.parse(localStorage.getItem('objMenu'));
    this.listaMenu = [

      {
        "recursoPadre":{
          "codigo": 1,
          "nombre":"SERVICIOS",
          "url":"Principal",
          "icon":"icon ion-ios-home-outline",
          "descripcion":"SERVICIOS",
          "ordenMenu":1
        },
        "listRecursoHijos":[
          {
            "codigo": 1,
            "nombre":"Medios de Pago",
            "url":"/servicios/medioPago",
            "icon":null,
            "descripcion":"Medios de Pago",
            "ordenMenu":1
          },
          {
            "codigo": 2,
            "nombre":"Conciliaciones",
            "url":"/servicios/conciliacion",
            "icon":null,
            "descripcion":"Conciliaciones",
            "ordenMenu":2
          }
        ]
      }
    ];
  }

  ngOnInit() {
    // Ocultar los submenus al iniciar
    this.mostrarMenu = '0';
  }

  ngOnChanges() {
    // Ocultar los submenus cada vez que haga click
    this.mostrarMenu = '0';
  }

  expandirMenu(menuSeleccionado: any) {
    if (menuSeleccionado === this.mostrarMenu) {
      // Ocultar submenu
      this.mostrarMenu = '0';
    }else {
      // Mostrar submenu
      this.mostrarMenu = menuSeleccionado;
      this.estadoMenu = true;
      // Si la pantalla es grande y esta cerrado
      if (this.isToggled() && window.innerWidth > 992) {
        // Mostrar submenu y expandir el menú comprimido
        this.toggleSidebar();
      }
    }
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

}
