import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IListElement } from 'app/config/interfaces';
import { IListItem } from '../../../config/interfaces/list-item';

@Component({
  selector: 'aj-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  @Input() menuData: IListElement;
  @Output() clicked: EventEmitter<IListItem>;

  constructor() {
    this.clicked = new EventEmitter<IListItem>();
  }

  onClicked(item: IListItem): void {
    this.clicked.emit(item);
  }
}
