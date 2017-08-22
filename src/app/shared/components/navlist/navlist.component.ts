import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { IListElement } from 'app/config/interfaces/list-element.interface';

@Component({
  selector: 'aj-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.scss'],
  // encapsulation: ViewEncapsulation.None
})

export class NavListComponent {

  @Input() navListData: IListElement;
  @Output() clicked: EventEmitter<void>;

  constructor() {
    this.clicked = new EventEmitter<void>();
  }

  onClicked(event): void {
    this.clicked.emit();
  }
}
