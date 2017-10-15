import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange, MatChipInputEvent } from '@angular/material';
import { TdCollapseAnimation } from '@covalent/core';
import { TranslateService } from '@ngx-translate/core';

import { IMultiSelectElement, ISelectItem } from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';
import { KeyCode } from 'app/shared/util/util';

const CHIP_KEY_CODES = [KeyCode.ENTER, KeyCode.COMMA];

@Component({
  selector: 'aj-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    TdCollapseAnimation()
  ],
})

export class MultiSelectComponent implements OnInit {

  @Input() data: IMultiSelectElement;
  formControl: FormControl;
  chips: ISelectItem[];
  collapsed: boolean;
  chipKeyCodes: KeyCode[];
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  @ViewChild('selectInput') selectInput: ElementRef;
  inputFocused: boolean;

  constructor(private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef) {
    this.chipKeyCodes = CHIP_KEY_CODES;
    this.chips = [];
    this.collapsed = true;
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnInit() {
    this.formControl = ValidationUtil.generateFormControl(this.data.validators);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  getFloatingMode(): string {
    return this.chips.length === 0 && (!this.inputFocused || this.data.readOnly) ? 'never' : 'always';
  }

  toggle(event: any): void {
    this.collapsed = !this.collapsed;
    if (! this.collapsed) {
      this.selectInput.nativeElement.focus();
    }
    event.stopPropagation();
  }

  onBlur(event: any): void {
    setTimeout(() => this.inputFocused = false);
    setTimeout(() => {
      if (! this.inputFocused) {
        this.collapsed = true;
        this.changeDetectorRef.detectChanges();
      }
    }, 200);
  }

  onFocus(): void {
    this.inputFocused = true;
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

  onSelectChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.chips.push(this.data.selectList[event.source.tabIndex]);
    } else {
      const index = this.chips.findIndex((chip) => chip.name === event.source.name);
      this.chips.splice(index, 1);
    }
    this.selectInput.nativeElement.focus();
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
    return {name: newChip.toLowerCase(), display: newChip, value: true};
  }

  addChip(event: MatChipInputEvent): void {
    if (event.value && event.value.trim() !== '') {
      const chipToAdd = this.validateChip(event.value);
      if (chipToAdd) {
        this.chips.push(chipToAdd);
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  removeChipAt(index: number): void {
    this.chips[index].value = false;
    this.chips.splice(index, 1);
    this.selectInput.nativeElement.focus();
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.data.validators, this.formControl);
  }
}
