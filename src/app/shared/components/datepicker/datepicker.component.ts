import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  ViewContainerRef,
  ComponentRef,
  HostListener
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayState,
  PositionStrategy
} from '@angular/material';
import { ComponentPortal } from '@angular/cdk';
import { FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as _ from 'lodash';

import { MediaQueryBreakPoint } from 'app/config/common/app.config';
import {
  IDatePickerElement,
  IValidator,
  IDate
} from 'app/config/interfaces';
import { DatePickerConfig, IDatePicker } from 'app/config/shared/datepicker.config';
import { Util, KeyCode } from 'app/shared/util/util';
import { MomentService } from 'app/shared/services/moment.service';

@Component({
  moduleId: module.id,
  selector: 'aj-datepicker-content',
  templateUrl: 'datepicker-content.html',
  styleUrls: ['datepicker-content.scss']
})

export class DatePickerContentComponent {
  datepicker: DatePickerComponent;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === KeyCode.ESC) {
      this.datepicker.close();
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

@Component({
  selector: 'aj-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatePickerComponent implements OnChanges, OnInit {

  @Input() data: IDatePickerElement;
  @Output() bindControl: EventEmitter<{}>;

  configData: IDatePicker;
  formControl: FormControl;
  placeHolder: string;
  selected: IDate;
  inputValue: string;
  dateFormat: string;
  opened: boolean;

  private popupRef: OverlayRef;
  private calendarPortal: ComponentPortal<DatePickerContentComponent>;

  constructor(private elementRef: ElementRef,
              private overlay: Overlay,
              private ngZone: NgZone,
              private viewContainerRef: ViewContainerRef,
              private momentService: MomentService,
              private translateService: TranslateService) {
    this.configData = _.mapKeys(new DatePickerConfig().elements, 'name');
    this.selected = null;
    this.inputValue = '';
    this.dateFormat = this.configData.calendar.dateFormat;
    this.opened = false;
    this.bindControl = new EventEmitter<{}>();

    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setPlaceHolder();
      if (this.selected) {
        this.inputValue = this.momentService.formatDate(this.selected, this.dateFormat);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.enabledDateRange) {
      this.configData.calendar.enabledDateRange = this.data.enabledDateRange;
    }
    this.setPlaceHolder();
  }

  ngOnInit() {
    this.generateFormControl(this.configData.dateInput.validators);
  }

  setPlaceHolder() {
    const placeHolderText = this.translateService.instant(this.data.placeHolder);
    const placeHolderFormat = this.translateService.instant(this.dateFormat).toLowerCase();
    this.placeHolder = `${placeHolderText} (${placeHolderFormat})`;
  }

  generateFormControl(controlValidators: IValidator[]): void {
    const validators = [];
    controlValidators.forEach(validator => {
      if (validator.name === 'dateWithinRange') {
        validators.push(validator.validateFunc(this.data.enabledDateRange, this.dateFormat, this.momentService));
      } else if (validator.name === 'isValidDate') {
        validators.push(validator.validateFunc(this.dateFormat, this.momentService));
      }
    });
    this.formControl = new FormControl('', validators, []);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  open(event: any): void {
    if (this.opened) {
      return;
    }
    if (!this.calendarPortal) {
      this.calendarPortal = new ComponentPortal(DatePickerContentComponent, this.viewContainerRef);
    }
    this.openAsPopup();
    this.opened = true;
    event.stopPropagation();
  }

  close(): void {
    if (!this.opened) {
      return;
    }
    if (this.popupRef && this.popupRef.hasAttached()) {
      this.popupRef.detach();
    }
    if (this.calendarPortal && this.calendarPortal.isAttached) {
      this.calendarPortal.detach();
    }
    this.opened = false;
  }

  clearInput(event: any): void {
    this.selected = null;
    this.inputValue = '';
    event.stopPropagation();
  }

  onInputChange(value: string): void {
    this.selected = this.momentService.isValidDate(value, this.dateFormat) ?
      this.momentService.parseDate(value, this.dateFormat) : null;
  }

  onDateSelected(value: IDate): void {
    this.selected = value;
    if (value) {
      this.inputValue = this.momentService.formatDate(value, this.dateFormat);
      this.close();
    } else {
      this.inputValue = '';
    }
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    for (const validator of this.configData.dateInput.validators) {
      if (this.formControl.hasError(validator.name)) {
        return validator.error;
      }
    }
    return null;
  }

  private openAsPopup(): void {
    if (!this.popupRef) {
      this.createPopup();
    }

    if (!this.popupRef.hasAttached()) {
      const componentRef: ComponentRef<DatePickerContentComponent> =
        this.popupRef.attach(this.calendarPortal);
      componentRef.instance.datepicker = this;

      /* Update the position once the calendar has rendered. */
      this.ngZone.onStable.first().subscribe(() => this.popupRef.updatePosition());

      this.popupRef.backdropClick().subscribe(() => this.close());
    }
  }

  private createPopup(): void {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this.widthIsExtraSmall() ?
      this.overlay.position().global().centerHorizontally().centerVertically() :
      this.createPopupPositionStrategy();
    // overlayState.positionStrategy = this.createPopupPositionStrategy();
    overlayState.hasBackdrop = true;
    // overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
    overlayState.direction = 'ltr';
    overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();

    this.popupRef = this.overlay.create(overlayState);
  }

  private createPopupPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .connectedTo(this.elementRef,
        {originX: 'center', originY: 'bottom'},
        {overlayX: 'center', overlayY: 'top'})
      .withFallbackPosition(
        {originX: 'center', originY: 'top'},
        {overlayX: 'center', overlayY: 'bottom'});
  }

  private widthIsExtraSmall(): boolean {
    return Util.isBreakPointOf(window.innerWidth, MediaQueryBreakPoint.EXTRA_SMALL);
  }
}
