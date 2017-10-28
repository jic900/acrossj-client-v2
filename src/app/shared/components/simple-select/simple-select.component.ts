import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';

import {
  ISimpleSelectElement,
  ISelectItem,
  SelectMode,
  SelectLayout
} from 'app/config/interfaces';
import { ValidationUtil } from 'app/shared/util/validation-util';

@Component({
  selector: 'aj-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss']
})

export class SimpleSelectComponent implements OnChanges, OnInit {

  @Input() data: ISimpleSelectElement;
  @Input() mode: SelectMode;
  @Input() layout: SelectLayout;
  formControl: FormControl;
  @Output() bindControl: EventEmitter<{}>;
  @Output() clicked: EventEmitter<void>;
  selected: string;
  value: ISelectItem[];

  constructor() {
    this.value = [];
    this.bindControl = new EventEmitter<{}>();
    this.clicked = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (! this.mode) {
      this.mode = SelectMode.SINGLE;
    }
    if (this.layout === undefined || this.layout === null) {
      this.layout = SelectLayout.ROW;
    }
  }

  ngOnInit() {
    this.formControl = ValidationUtil.generateFormControl(this.data.validators);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  isSingleMode(): boolean {
    return this.mode === SelectMode.SINGLE;
  }

  isRowLayout(): boolean {
    return this.layout === SelectLayout.ROW;
  }

  onClicked(event: any): void {
    this.clicked.emit();
  }

  onSingleSelectChange(selectedIndex: number, event: any): void {
    this.value = [];
    this.data.selectList[selectedIndex].value = true;
    this.value.push(this.data.selectList[selectedIndex]);
    this.formControl.markAsDirty();
  }

  onMultiSelectChange(event: MatCheckboxChange): void {
    if (event.checked) {
      this.value.push(this.data.selectList[event.source.tabIndex]);
    } else {
      const index = this.value.findIndex((item) => item.name === event.source.name);
      this.value.splice(index, 1);
    }
    this.formControl.markAsDirty();
  }

  onSelectedValueChange(event: ISelectItem[]): void {
    this.value.forEach((selectedItem, index) => {
      for (const listItem of this.data.selectList) {
        if (selectedItem.name === listItem.name) {
          listItem.value = true;
          if (this.mode === SelectMode.SINGLE) {
            this.selected = selectedItem.name;
          }
        }
      }
    });
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.data.validators, this.formControl);
  }
}
