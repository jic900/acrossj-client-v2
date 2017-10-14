import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

import { ISelectElement } from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';
import { KeyCode } from 'app/shared/util/util';
import { ENTER } from '@angular/cdk/keycodes';


enum SelectMode {SINGLE, MULTI}

const CHIP_KEY_CODES = [KeyCode.ENTER, KeyCode.COMMA];

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnChanges, OnInit {

  @Input() data: ISelectElement;
  formControl: FormControl;
  inputValue: string;
  chips: string[];
  expanded: boolean;
  mode: SelectMode;
  chipKeyCodes: KeyCode[];
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  @ViewChild('selectInput') selectInput: ElementRef;

  inputFocused: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.chipKeyCodes = CHIP_KEY_CODES;
    this.inputValue =  ' ';
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.data.chipOptions) {
    //   // this.chips = [];
    //   this.chips = ['Male', 'Female'];
    // }
    // if (! this.data.mode) {
    //   this.mode = SelectMode.SINGLE;
    // }
  }

  ngOnInit() {
    this.formControl = ValidationUtil.generateFormControl(this.data.validators);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  getFloatingMode(): string {
    return this.chips.length === 0 && (!this.inputFocused || this.data.readOnly) ? 'never' : 'always';
  }

  toggle(event: any): void {
    event.stopPropagation();
  }

  onInputChange(value: string): void {
  }

  onClicked(event: any): void {
    this.clicked.emit();
  }

  onBlur(): void {
    this.inputFocused = false;
  }
  onFocus(): void {
    console.log(this.selectInput);
    this.inputFocused = true;
    this.renderer.removeClass(this.elementRef.nativeElement.firstElementChild, 'mat-focused');
    this.selectInput.nativeElement.focus();
  }

  addChip(event: MatChipInputEvent): void {
    if ((event.value || '').trim()) {
      this.chips.push(event.value.trim());
    }
    if (event.input) {
      // this.inputValue = '';
      event.input.value = '';
    }
  }

  removeChipAt(index: number): void {
    this.chips.splice(index, 1);
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.data.validators, this.formControl);
  }
}
