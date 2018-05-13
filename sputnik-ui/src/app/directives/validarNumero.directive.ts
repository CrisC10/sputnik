import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[validarNumeroDirective]'
})
export class ValidarNumeroDirective {
  elemRef: ElementRef

  constructor(private el: ElementRef) {
    this.elemRef = el;
  }

  @Input() Enteros: string;
  @Input() Decimales: string;

  arrayValidacion = ['Backspace', 'Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    let e = <any> event

    if (this.arrayValidacion.indexOf(e.key) !== -1) {
      let dotLength: number = e.target.value.replace(/[^\.]/g, '').length;
      let enteroLength = e.target.value.split('.')[0] ? e.target.value.split('.')[0].length : 0;
      let decimalLength = e.target.value.split('.')[1] ? e.target.value.split('.')[1].length : 0;
      let currentCursorPos: number = -1;

      if (typeof this.elemRef.nativeElement.selectionStart === 'number') {
        currentCursorPos = this.elemRef.nativeElement.selectionStart;
      } else {
        // Probably an old IE browser
        console.log('This browser doesn\'t support selectionStart');
      }

      if(parseInt(this.Decimales) <= 0 && e.key === '.'){
        e.preventDefault();
      }

      if ( this.Enteros && e.key !== '.' && enteroLength > (parseInt(this.Enteros) - 1) &&
        ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) === -1 ) {
        if (e.target.value.indexOf('.') === -1){
          // console.log(1111);
          e.preventDefault();
        }
        else {
          if (enteroLength > (parseInt(this.Enteros) - 1) && decimalLength > (parseInt(this.Decimales) - 1)){
            // console.log(2222);
            e.preventDefault();
          }
        }
      }

      if (this.Decimales && parseInt(this.Decimales) > 0) {
        if ( dotLength > 1 || (dotLength === 1 && e.key === '.') || (decimalLength > (parseInt(this.Decimales) - 1) &&
            currentCursorPos > e.target.value.indexOf('.')) && ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) === -1 ) {
          // console.log(3333);
          e.preventDefault();
        }
      }
    } else {
      e.preventDefault();
    }
  }
}
