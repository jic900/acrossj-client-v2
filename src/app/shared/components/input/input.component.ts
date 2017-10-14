import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  IInputElement,
  IFormValidatorData
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

@Component({
  selector: 'aj-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnChanges, OnInit {

  @Input() inputData: IInputElement;
  @Input() type: string;
  @Input() readonly: boolean;
  @Input() formValidatorData: IFormValidatorData;
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  formControl: FormControl;

  constructor() {
    this.type = 'text';
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.readonly) {
      this.readonly = false;
    }
  }

  ngOnInit() {
    this.formControl = ValidationUtil.generateFormControl(this.inputData.validators);
    this.bindControl.emit({'name': this.inputData.name, 'control': this.formControl});
  }

  onClick(event): void {
    this.clicked.emit();
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.inputData.validators, this.formControl);
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  formValidateFailed(): boolean {
    if (this.formValidatorData) {
      return this.formControl.valid && this.formValidatorData.validateFunc() && this.formControl.touched;
    }
    return false;
  }

  getFormValidateError(): string {
    return this.formValidatorData.errorFunc();
  }
}
