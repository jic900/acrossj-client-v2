import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { IListElement, IListItem } from 'app/config/interfaces';
import { ILinkElement } from '../../../config/interfaces/link-element.interface';

@Component({
  selector: 'aj-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.scss'],
})

export class NavListComponent implements OnChanges {

  @Input() navListData: IListElement;
  @Input() selectedIndex: number;
  @Input() multiLine: boolean;
  @Input() showDivider: boolean;
  @Input() showNavIcon: boolean;
  @Output() clicked: EventEmitter<IListItem>;
  @Output() selectedIndexChange: EventEmitter<number>;
  selectable: boolean;

  constructor(private router: Router) {
    this.clicked = new EventEmitter<IListItem>();
    this.selectedIndexChange = new EventEmitter<number>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('selectedIndex')) {
      this.selectable = true;
    }
    if (! changes.hasOwnProperty('multiLine')) {
      this.multiLine = false;
    }
    if (! changes.hasOwnProperty('showDivider')) {
      this.showDivider = false;
    }
    if (! changes.hasOwnProperty('showNavIcon')) {
      this.showNavIcon = false;
    }
  }

  onClicked(selectedIndex: number, clickedItem: IListItem): void {
    if (selectedIndex !== -1 && selectedIndex !== this.selectedIndex) {
      this.selectedIndexChange.emit(selectedIndex);
      this.selectedIndex = selectedIndex;
    }
    if (clickedItem.type !== 'list') {
      if (clickedItem.type === 'link') {
        const linkItem = <ILinkElement> clickedItem;
        const navUrl = linkItem.link.param ? `${linkItem.link.path}/${linkItem.link.param}` : linkItem.link.path;
        this.router.navigateByUrl(navUrl);
      }
      this.clicked.emit(clickedItem);
    }
  }
}
