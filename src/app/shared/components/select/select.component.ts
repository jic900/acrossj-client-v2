import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { ISelectElement, ISelectItem } from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {

  @Input() data: ISelectElement;
  formControl: FormControl;
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  selected: string;

  constructor() {
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnInit() {
    this.formControl = ValidationUtil.generateFormControl(this.data.validators);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  onClicked(event: any): void {
    this.clicked.emit();
  }

  onChange(event: any): void {
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.data.validators, this.formControl);
  }
}
