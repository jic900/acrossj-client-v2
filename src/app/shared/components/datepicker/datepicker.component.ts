import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
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
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as _ from 'lodash';

import { DATE_FORMAT, MediaQueryBreakPoint } from 'app/config/common/app.config';
import {
  IDatePickerElement,
  IValidator,
  IDate,
  ICalendarOptions
} from 'app/config/interfaces';
import {
  DatePickerConfig,
  IDatePicker,
  IDateRangeCalendar
} from 'app/config/shared/datepicker.config';
import { Util, KeyCode } from 'app/shared/util/util';
import { ValidationUtil } from 'app/shared/util/validation-util';
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

export enum DatePickerMode {DEFAULT, RANGE}

@Component({
  selector: 'aj-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatePickerComponent implements OnChanges, OnInit, OnDestroy {

  @Input() data: IDatePickerElement;
  @Input() mode: DatePickerMode;
  @Output() clicked: EventEmitter<void>;
  @Output() bindControl: EventEmitter<{}>;
  @Output() inputChange: EventEmitter<void>;

  elements: IDatePicker;
  calOptions: ICalendarOptions;
  dateRangeCalendarData: IDateRangeCalendar;
  formControl: FormControl;
  placeHolder: string;
  inputValue: string;
  selected: IDate[];
  opened: boolean;
  translateSub: Subscription;

  private popupRef: OverlayRef;
  private calendarPortal: ComponentPortal<DatePickerContentComponent>;

  constructor(private elementRef: ElementRef,
              private overlay: Overlay,
              private ngZone: NgZone,
              private viewContainerRef: ViewContainerRef,
              private momentService: MomentService,
              private translateService: TranslateService) {
    const datePickerConfig = new DatePickerConfig();
    this.elements = _.mapKeys(datePickerConfig.elements, 'name');
    this.calOptions = datePickerConfig.calendarOptions;
    this.dateRangeCalendarData = _.mapKeys(this.elements.dateRangeCalendar.elements, 'name');
    this.selected = null;
    this.inputValue = '';
    this.opened = false;
    this.clicked = new EventEmitter<void>();
    this.bindControl = new EventEmitter<{}>();
    this.inputChange = new EventEmitter<void>();

    this.translateSub = translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setPlaceHolder();
      this.setInputValue();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.enabledDateRange) {
      this.calOptions.enabledDateRange = this.data.enabledDateRange;
    }
    if (! this.mode) {
      this.mode = DatePickerMode.DEFAULT;
    }
    this.setPlaceHolder();
  }

  ngOnInit(): void {
    this.generateFormControl(this.elements.dateInput.validators);
  }

  generateFormControl(controlValidators: IValidator[]): void {
    const validators = [];
    controlValidators.forEach(validator => {
      if (this.mode === DatePickerMode.DEFAULT) {
        if (validator.name === 'dateWithinRange') {
          validators.push(validator.validateFunc(this.data.enabledDateRange, this.momentService));
        } else if (validator.name === 'isValidDate') {
          validators.push(validator.validateFunc(this.momentService));
        }
      } else if (this.data.readOnly) {
        if (validator.name === 'endDateExists') {
          validators.push(validator.validateFunc(this.momentService));
        }
      } else {
        if (validator.name === 'isValidDateRange') {
          validators.push(validator.validateFunc(this.momentService));
        }
      }
    });
    this.formControl = new FormControl('', validators, []);
    this.bindControl.emit({'name': this.data.name, 'control': this.formControl});
  }

  ngOnDestroy(): void {
    this.translateSub.unsubscribe();
  }

  isRangeMode(): boolean {
    return this.mode === DatePickerMode.RANGE;
  }

  setInputValue() {
    if (! this.selected) {
      return;
    }
    if (this.selected[0]) {
      this.inputValue = this.momentService.formatDate(this.selected[0]);
      this.formControl.markAsDirty();
    }
    if (this.mode === DatePickerMode.RANGE) {
      if (this.selected[1]) {
        this.inputValue = `${this.inputValue} - ${this.momentService.formatDate(this.selected[1])}`;
      } else {
        this.inputValue = `${this.inputValue} - ${this.translateService.instant(this.dateRangeCalendarData.endDate.display)}`;
      }
      this.formControl.markAsDirty();
    }
  }

  setPlaceHolder() {
    this.placeHolder = this.translateService.instant(this.data.placeHolder);
    if (this.mode === DatePickerMode.DEFAULT) {
      const placeHolderFormat = this.translateService.instant(DATE_FORMAT).toLowerCase();
      this.placeHolder = `${this.placeHolder} (${placeHolderFormat})`;
    }
  }

  onClicked(event: any): void {
    if (this.data.readOnly) {
      this.open(event);
    }
    this.clicked.emit();
    event.preventDefault();
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
    this.clicked.emit();
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
    if (this.inputValue !== '') {
      this.formControl.markAsDirty();
    }
    this.inputValue = '';
    this.clicked.emit();
    event.stopPropagation();
  }

  onInputChange(value: string): void {
    if (this.mode === DatePickerMode.DEFAULT) {
      this.selected = value && value.trim() !== '' && this.momentService.isValidDate(value) ?
        [this.momentService.parseDate(value)] : null;
    } else {
      // TODO
    }
    this.inputChange.emit();
  }

  onSelected(value: IDate[]): void {
    this.selected = value;
    if ( value && value.length > 0) {
      this.setInputValue();
      if (! (value.length === 2 && value[1] === null)) {
        this.close();
      }
    } else {
      this.inputValue = '';
    }
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getValidatorError(): string {
    return ValidationUtil.getValidatorError(this.elements.dateInput.validators, this.formControl);
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
    const overlayConfig = new OverlayConfig();
    overlayConfig.positionStrategy = this.widthIsExtraSmall() ?
      this.overlay.position().global().centerHorizontally().centerVertically() :
      this.createPopupPositionStrategy();
    // overlayState.positionStrategy = this.createPopupPositionStrategy();
    overlayConfig.hasBackdrop = true;
    // overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayConfig.backdropClass = 'cdk-overlay-dark-backdrop';
    overlayConfig.direction = 'ltr';
    overlayConfig.scrollStrategy = this.overlay.scrollStrategies.reposition();

    this.popupRef = this.overlay.create(overlayConfig);
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
