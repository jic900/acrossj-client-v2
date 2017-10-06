import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IListElement, IListItem } from 'app/config/interfaces';

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {

  @Input() inputData: IListElement;
  @Input() required: boolean;
  @Input() selectedValue: string;
  @Output() bindControl: EventEmitter<{}>;
  @Output() selectedValueChange: EventEmitter<IListItem>;
  formControl: FormControl;

  constructor() {
    this.required = false;
    this.bindControl = new EventEmitter<{}>();
    this.selectedValueChange = new EventEmitter<IListItem>();
  }

  ngOnInit() {
    const validators = this.required ? [Validators.required] : [];
    this.formControl = new FormControl('', validators);
    this.bindControl.emit({'name': this.inputData.name, 'control': this.formControl});
  }

  onChange(event): void {
    const selectedElement: IListItem = (<IListItem[]>this.inputData.list).filter(element => {
      return element.name === this.selectedValue;
    })[0];
    this.selectedValueChange.emit(selectedElement);
  }
}
