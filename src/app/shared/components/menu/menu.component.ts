import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IListElement } from 'app/config/interfaces';

@Component({
  selector: 'aj-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  @Input() menuData: IListElement;
  @Output() clicked: EventEmitter<string>;

  constructor() {
    this.clicked = new EventEmitter<string>();
  }

  onClicked(itemName: string): void {
    this.clicked.emit(itemName);
  }
}
