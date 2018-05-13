import {Component} from '@angular/core';

@Component({
  selector: 'subheader',
  styleUrls: ['subheader.component.scss'],
  template: `
    <div class="sub-container">
      <i class="icon ion-android-laptop"></i> <span class="sub-text">MENÚ</span>
    </div>
  `
})
export class SubheaderComponent {
}
