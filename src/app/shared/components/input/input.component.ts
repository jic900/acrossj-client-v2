import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IValidator } from 'app/config/interfaces/validator.interface';

export interface IFormValidatorData {
  validateFunc: Function;
  errorFunc: Function;
}

@Component({
  selector: 'aj-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  @Input() inputData: IInputElement;
  @Input() type: string;
  @Input() customValidators: {};
  @Input() formValidatorData: IFormValidatorData;
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  formControl: FormControl;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.type = 'text';
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnInit() {
    this.generateFormControl(this.inputData.validators, this.customValidators);
  }

  generateFormControl(controlValidators: IValidator[], customValidators: {}): void {
    const validators = [];
    const asyncValidators = [];
    if (controlValidators) {
      controlValidators.forEach(validator => {
        if (validator.type === 'builtin') {
          validators.push(this.getBuiltinValidator(validator));
        } else if (validator.type === 'custom') {
          validators.push(customValidators[validator.name]);
        } else if (validator.type === 'customAsync') {
          asyncValidators.push(customValidators[validator.name]);
        }
      });
    }
    this.formControl = new FormControl('', validators, asyncValidators);
    this.bindControl.emit({'name': this.inputData.name, 'control': this.formControl});
  }

  onClick(event): void {
    // workaround to fix angular material bug
    if (this.inputData.readOnly) {
      setTimeout(() => {
        this.renderer.removeClass(this.elementRef.nativeElement.firstElementChild, 'mat-focused');
      }, 10);
    } else {
      this.clicked.emit();
    }
  }

  getBuiltinValidator(validator: IValidator): Function {
    switch (validator.name) {
      case 'required':
        return Validators.required;
      case 'minlength':
        return Validators.minLength(validator.value);
      case 'maxlength':
        return Validators.maxLength(validator.value);
      case 'pattern':
        return Validators.pattern(validator.value);
    }
  }

  getValidatorError(): string {
    for (const validator of this.inputData.validators) {
      if (this.formControl.hasError(validator.name)) {
        return validator.error;
      }
    }
    return null;
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
