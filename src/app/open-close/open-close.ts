import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-open-close',
  imports: [],
  templateUrl: './open-close.html',
  styleUrl: './open-close.css'
})
export class OpenClose {

  isShown = signal(false);
  toggle() {
    this.isShown.update((isShown) => !isShown);
  }

}
