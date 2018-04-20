import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[validarLetrasDirective]'
})
export class ValidarLetrasDirective implements OnInit{

  @Input() SoloLetras: string;
  @Input() Especiales: string;

  private elemRef: any;

  arrayValidacion = [];
  tempEspecial = [];

  arrayLetras = ['Backspace', 'ArrowLeft', 'ArrowRight', ' ',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    "Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú"
  ];

  arrayLetrasNumeros = ['Backspace', 'ArrowLeft', 'ArrowRight', ' ',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    "Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú",
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ];

  constructor(private el: ElementRef) {
    this.elemRef = this.el.nativeElement;
  }

  ngOnInit() {
    if (this.SoloLetras === 'no' || this.SoloLetras === 'NO' || this.SoloLetras === 'No' ) {
      this.arrayValidacion = this.arrayLetrasNumeros;
    } else {
      if (this.SoloLetras === 'si' || this.SoloLetras === 'SI' || this.SoloLetras === 'Si' ) {
        this.arrayValidacion = this.arrayLetras;
      }
    }

    if (this.Especiales !== undefined) {
      if (this.Especiales !== '') {
        this.tempEspecial = this.Especiales.split('');
        this.arrayValidacion = this.arrayValidacion.concat(this.tempEspecial);
      }
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const e = <any> event;

    if (this.arrayValidacion.indexOf(e.key) !== -1) {
      // console.log('el', this.elemRef.value);
      // console.log('key', e.key);

      if (this.elemRef.value !== '') {
        const arrayLetras = this.elemRef.value.split(' ');

        // console.log('arrayLetras', arrayLetras);
        if (arrayLetras[arrayLetras.length - 1] === '' && e.key === ' ') {
          e.preventDefault();
          console.log(111);
        } else {
          if (arrayLetras[0] === '' && e.key === ' ') {
            this.elemRef.value = this.elemRef.value.trim();
            // e.preventDefault();
            console.log(222);
          } /*else {
            if (arrayLetras[0] === '') {
              console.log(1111);
              this.elemRef.value = this.elemRef.value.trim();
            }
          }*/
        }
      } else {
        if (e.key === ' ') {
          e.preventDefault();
          console.log(333);
        }
      }
    } else {
      e.preventDefault();
      // console.log(444);
    }
  }

  /*@HostListener('focus', ['$event.target.value']) onFocus(value) {
    console.log('21', this.elemRef);
    this.elemRef.value = this.elemRef.value.trim();
    console.log()
  }*/

  @HostListener('blur', ['$event.target.value']) onBlur(value) {
    this.elemRef.value = this.elemRef.value.trim();
  }



}
