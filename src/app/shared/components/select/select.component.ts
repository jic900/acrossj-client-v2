import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { TdCollapseAnimation } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';

import { ISelectElement, ISelectItem, SelectMode } from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';
import { KeyCode } from 'app/shared/util/util';

const CHIP_KEY_CODES = [KeyCode.ENTER, KeyCode.COMMA];

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    TdCollapseAnimation()
  ],
})

export class SelectComponent implements OnChanges, OnInit, OnDestroy {

  @Input() data: ISelectElement;
  @Input() mode: SelectMode;
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  @ViewChild('selectInput') selectInput: ElementRef;
  formControl: FormControl;
  chips: ISelectItem[];
  inputValue: string;
  collapsed: boolean;
  chipKeyCodes: KeyCode[];
  inputFocused: boolean;
  selected: string;
  destroy: boolean;

  constructor(private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef) {
    this.chipKeyCodes = CHIP_KEY_CODES;
    this.chips = [];
    this.inputValue = '';
    this.collapsed = true;
    this.destroy = false;
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (! this.mode) {
      this.mode = SelectMode.SINGLE;
    }
  }

  ngOnInit() {
    if (this.data.validators) {
      this.data.validators.forEach((validator) => {
        if (validator.name === 'validSelectInput') {
          validator.validateFunc = validator.validateFunc(this);
        } else if (validator.name === 'selectInputPattern') {
          const field = this.mode === SelectMode.SINGLE ? 'value' : 'name';
          validator.validateFunc = validator.validateFunc(field, validator.value);
        }
      });
    }
    this.formControl = ValidationUtil.generateFormControl(this.data.validators);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

  isSingleMode(): boolean {
    return this.mode === SelectMode.SINGLE;
  }

  getFloatingMode(): string {
    return this.chips.length === 0 &&
      ((!this.inputFocused && (!this.inputValue || this.inputValue === '')) || this.data.readOnly ) ? 'never' : 'always';
  }

  toggle(event: any): void {
    this.collapsed = !this.collapsed;
    if (! this.collapsed) {
      this.selectInput.nativeElement.focus();
    }
    event.stopPropagation();
  }

  onBlur(event: any): void {
    this.inputFocused = false;
    this.formControl.markAsTouched();
    setTimeout(() => {
      if (! this.inputFocused) {
        this.collapsed = true;
        if (! this.destroy) {
          this.changeDetectorRef.detectChanges();
        }
      }
    }, 200);
  }

  onFocus(): void {
    this.inputFocused = true;
    this.formControl.markAsUntouched();
    if (this.chips.length === 0) {
      this.collapsed = false;
    }
  }

  onClicked(event: any): void {
    if (! this.data.readOnly) {
      this.selectInput.nativeElement.focus();
      this.collapsed = false;
    } else {
      this.toggle(event);
    }
    this.clicked.emit();
  }

  onValueChange(newValue: ISelectItem[]): void {
    this.chips.forEach((chip, index) => {
      for (const listItem of this.data.selectList) {
        if (chip.name === listItem.name) {
          if (this.mode === SelectMode.MULTI) {
            listItem.value = true;
          } else {
            if (! this.data.readOnly && chip.value) {
              this.inputValue = chip.value;
              listItem.value = chip.value;
            }
            this.selected = chip.name;
          }
          this.chips[index] = listItem;
        }
      }
    });
  }

  onMultiSelectChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.chips.push(this.data.selectList[event.source.tabIndex]);
    } else {
      const index = this.chips.findIndex((chip) => chip.name === event.source.name);
      this.chips.splice(index, 1);
    }
    this.formControl.markAsDirty();
    this.selectInput.nativeElement.focus();
  }

  onSingleSelectChange(selectedIndex: number, event: any): void {
    if (this.chips.length === 0) {
      if (! this.data.readOnly && this.inputValue) {
        this.data.selectList[selectedIndex].value = this.inputValue;
      }
      this.chips.push(this.data.selectList[selectedIndex]);
    } else {
      if (! this.data.readOnly) {
        this.data.selectList[selectedIndex].value = this.inputValue;
        this.chips[0].value = null;
      }
      this.chips[0] = this.data.selectList[selectedIndex];
    }
    this.formControl.markAsDirty();
    this.formControl.updateValueAndValidity();
    if (! this.data.readOnly) {
      this.selectInput.nativeElement.focus();
    }
  }

  onSelectInputChange(newValue: string): void {
    if (this.mode === SelectMode.SINGLE && this.chips[0]) {
      this.chips[0].value = newValue;
      this.formControl.markAsDirty();
    }
    this.formControl.updateValueAndValidity();
  }

  validateChip(newChip: string): ISelectItem {
    for (const chip of this.data.selectList) {
      const translatedChip = this.translateService.instant(chip.display).toLowerCase();
      if (newChip.trim().toLowerCase() === translatedChip) {
        if (!chip.value) {
          chip.value = true;
          return chip;
        }
        return null;
      }
    }
    for (const chip of this.chips) {
      if (newChip.trim().toLowerCase() === chip.display.toLowerCase()) {
        return null;
      }
    }
    return {name: newChip, display: newChip, value: true};
  }

  addChip(event: any): void {
    if (this.mode === SelectMode.MULTI) {
      if (event.value && event.value.trim() !== '') {
        const chipToAdd = this.validateChip(event.value);
        if (chipToAdd) {
          this.chips.push(chipToAdd);
          this.formControl.markAsDirty();
        }
      }
      if (event.input) {
        event.input.value = '';
      }
    }
  }

  removeChipAt(index: number): void {
    if (this.mode === SelectMode.MULTI) {
      this.chips[index].value = false;
      this.chips.splice(index, 1);
      this.selectInput.nativeElement.focus();
      this.formControl.markAsDirty();
    }
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.data.validators, this.formControl);
  }
}
