import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[validarNoEditable]'
})
export class ValidarNoEditableDirective {
  elemRef: ElementRef

  constructor(private el: ElementRef) {
    this.elemRef = el;
  }

  @Input() Editable: string;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    let e = <any> event
    // console.log(e);
    e.preventDefault();
  }
}
