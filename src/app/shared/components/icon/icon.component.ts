import {
  Component,
  OnInit,
  Input,
  ElementRef
} from '@angular/core';

import { IIcon, ILink } from 'app/config/interfaces';

@Component({
  selector: 'aj-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})

export class IconComponent implements OnInit {

  @Input() data: IIcon;
  @Input() cssClass: string;
  @Input() link: ILink;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);
  }

  isMaterialIcon(): boolean {
    return this.data.type === 'md';
  }

  isSvgIcon(): boolean {
    return this.data.type === 'svg';
  }

  isFontSet(): boolean {
    return this.data.type !== 'md' && this.data.type !== 'svg';
  }
}
