import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-advanced-animations',
  imports: [],
  templateUrl: './advanced-animations.html',
  styleUrl: './advanced-animations.css'
})
export class AdvancedAnimations {
  showList = signal(false);
  showCards = signal(false);
  items = signal(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  toggleList() {
    this.showList.update(show => !show);
  }

  toggleCards() {
    this.showCards.update(show => !show);
  }

  addItem() {
    const count = this.items().length + 1;
    this.items.update(items => [...items, `Item ${count}`]);
  }

  removeItem(index: number) {
    this.items.update(items => items.filter((_, i) => i !== index));
  }
}