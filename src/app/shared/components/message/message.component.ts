import {
  Component,
  Input,
} from '@angular/core';
import { IMessageElement } from 'app/config/interfaces/message-element';

@Component({
  selector: 'aj-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent {

  @Input() data: IMessageElement;
  constructor() {}

  getIconColor(): string {
    const messageType = this.data.message.type;
    if (messageType === 'info') {
      return 'blue';
    } else if (messageType === 'success') {
      return 'green';
    } else if (messageType === 'warning') {
      return 'orange';
    } else if (messageType === 'error') {
      return 'red';
    } else {
      return '';
    }
  }
}
