import {
  Component,
  OnChanges,
  SimpleChanges,
  AfterContentInit,
  HostListener,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  IDate,
  IWeek,
  IMonth,
  ICalendarOptions,
  ICalendarDay,
  ICalendarMonth,
  ICalendarYear
} from 'app/config/interfaces';
import { MomentService, DateField } from 'app/shared/services/moment.service';
import { KeyCode } from 'app/shared/util/util';
import { slideCalendar } from 'app/shared/util/animations';

enum SelectorMode {CALENDAR, MONTH, YEAR}
enum SelectState {START, END}
enum BorderType {NONE, CIRCLE, HALF_CIRCLE_LEFT, HALF_CIRCLE_RIGHT, SQUARE}

@Component({
  selector: 'aj-date-range-calendar',
  templateUrl: './date-range-calendar.component.html',
  styleUrls: ['./date-range-calendar.component.scss'],
  animations: [slideCalendar]
})

export class DateRangeCalendarComponent implements OnChanges, AfterContentInit {

  @Input() data: any;
  @Input() options: ICalendarOptions;
  @Input() selectedRange: IDate[];
  @Output() selected: EventEmitter<IDate[]>;
  SelectorMode: typeof SelectorMode;
  BorderType: typeof BorderType;
  selectorMode: SelectorMode;
  dateTable: IWeek[];
  monthTable: ICalendarMonth[][];
  yearTable: ICalendarYear[][];
  calTitle: string;
  visibleMonth: IMonth;
  activeDate: IDate;
  hoveredDate: IDate;
  selectState: SelectState;
  viewState: string;

  constructor(private elementRef: ElementRef,
              public momentService: MomentService,
              private translateService: TranslateService) {
    this.SelectorMode = SelectorMode;
    this.selectorMode = SelectorMode.CALENDAR;
    this.BorderType = BorderType;
    this.hoveredDate = null;
    this.selected = new EventEmitter<IDate[]>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.options.weekendHighlight) {
      this.options.weekendHighlight = true;
    }
    if (!this.options.markDates) {
      this.options.markDates = [];
    }
    if (!this.options.highlightDates) {
      this.options.highlightDates = [];
    }
    if (! this.selectedRange) {
      this.calTitle = this.translateService.instant(this.data.startDate.display);
    } else {
      this.calTitle = this.momentService.formatDate(this.selectedRange[0]);
      if (this.selectedRange[1] === null) {
        this.calTitle = `${this.calTitle} - ${this.translateService.instant(this.data.endDate.display)}`;
      } else {
        this.calTitle = `${this.calTitle} - ${this.momentService.formatDate(this.selectedRange[1])}`;
      }
    }
    this.selectState = this.selectedRange && this.selectedRange[1] === null ? SelectState.END : SelectState.START;
  }

  ngAfterContentInit() {
    this.init();
    this.elementRef.nativeElement.focus();
  }

  init(): void {
    const date: IDate = this.selectedRange ? this.selectedRange[0] : this.momentService.getToday();
    this.setVisibleMonth(date);
    this.activeDate = this.selectedRange ? this.selectedRange[0] : this.momentService.getToday();
    this.generateCalendar(date.month, date.year);
  }

  setVisibleMonth(date: IDate): void {
    this.visibleMonth = {monthTxt: this.momentService.monthLabels[date.month - 1], monthNbr: date.month, year: date.year};
  }

  setActiveDate(offsetType: DateField, offset: number, targetMode?: SelectorMode): void {
    const oldActiveDate = this.activeDate;
    if (offset !== 0) {
      if (offsetType === DateField.DAY) {
        this.activeDate = this.momentService.addCalendarDays(this.activeDate, offset);
      } else if (offsetType === DateField.MONTH) {
        this.activeDate = this.momentService.addCalendarMonths(this.activeDate, offset);
      } else {
        this.activeDate = this.momentService.addCalendarYears(this.activeDate, offset);
      }
    }
    this.setVisibleMonth(this.activeDate);
    if (targetMode === SelectorMode.CALENDAR) {
      if (this.selectorMode !== SelectorMode.CALENDAR || ! this.momentService.isSame(DateField.MONTH, this.activeDate, oldActiveDate)) {
        this.selectorMode = targetMode;
        this.generateCalendar(this.activeDate.month, this.activeDate.year);
        if (this.momentService.isAfter(DateField.MONTH, oldActiveDate, this.activeDate)) {
          this.viewState = 'right';
        } else {
          this.viewState = 'left';
        }
      }
    } else if (targetMode === SelectorMode.MONTH) {
      if (this.selectorMode !== SelectorMode.MONTH) {
        this.selectorMode = targetMode;
        this.generateMonths();
      }
    } else if (targetMode === SelectorMode.YEAR) {
      this.selectorMode = targetMode;
      if (this.yearNotDisplayed(this.activeDate.year)) {
        this.generateYears();
        if (oldActiveDate.year > this.activeDate.year) {
          this.viewState = 'top';
        } else {
          this.viewState = 'bottom';
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.selectorMode === SelectorMode.CALENDAR) {
      this.onKeyDownInCalendar(event);
    } else if (this.selectorMode === SelectorMode.YEAR) {
      this.onKeyDownInYear(event);
    } else {
      this.onKeyDownInMonth(event);
    }
    event.preventDefault();
  }

  onKeyDownInCalendar(event: KeyboardEvent): void {
    const targetMode = SelectorMode.CALENDAR;
    switch (event.keyCode) {
      case KeyCode.LEFT_ARROW:
        this.setActiveDate(DateField.DAY, -1, targetMode);
        break;
      case KeyCode.RIGHT_ARROW:
        this.setActiveDate(DateField.DAY, 1, targetMode);
        break;
      case KeyCode.UP_ARROW:
        this.setActiveDate(DateField.DAY, -7, targetMode);
        break;
      case KeyCode.DOWN_ARROW:
        this.setActiveDate(DateField.DAY, 7, targetMode);
        break;
      case KeyCode.HOME:
        this.setActiveDate(DateField.DAY, 1 - this.activeDate.day, targetMode);
        break;
      case KeyCode.END:
        const daysInThisMonth = this.momentService.daysInMonth(this.activeDate.month, this.activeDate.year);
        this.setActiveDate(DateField.DAY, daysInThisMonth - this.activeDate.day, targetMode);
        break;
      case KeyCode.PAGE_UP:
        this.setActiveDate(DateField.MONTH, -1, targetMode);
        break;
      case KeyCode.PAGE_DOWN:
        this.setActiveDate(DateField.MONTH, 1, targetMode);
        break;
      case KeyCode.ENTER:
        this.selectDate(this.activeDate);
        break;
      default:
        return;
    }
  }

  onKeyDownInMonth(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KeyCode.LEFT_ARROW:
        if (this.activeDate.month > 1) {
          this.setActiveDate(DateField.MONTH, -1);
        }
        break;
      case KeyCode.RIGHT_ARROW:
        if (this.activeDate.month < 12) {
          this.setActiveDate(DateField.MONTH, 1);
        }
        break;
      case KeyCode.UP_ARROW:
        if (this.activeDate.month > 3) {
          this.setActiveDate(DateField.MONTH, -3);
        }
        break;
      case KeyCode.DOWN_ARROW:
        if (this.activeDate.month < 10) {
          this.setActiveDate(DateField.MONTH, 3);
        }
        break;
      case KeyCode.HOME:
        if (this.activeDate.month !== 1) {
          this.setActiveDate(DateField.MONTH, 1 - this.activeDate.month);
        }
        break;
      case KeyCode.END:
        if (this.activeDate.month !== 12) {
          this.setActiveDate(DateField.MONTH, 12 - this.activeDate.month);
        }
        break;
      case KeyCode.ENTER:
        this.setActiveDate(null, 0, SelectorMode.CALENDAR);
        break;
      default:
        return;
    }
  }

  onKeyDownInYear(event: KeyboardEvent): void {
    const targetMode = SelectorMode.YEAR;
    switch (event.keyCode) {
      case KeyCode.LEFT_ARROW:
        this.setActiveDate(DateField.YEAR, -1, targetMode);
        break;
      case KeyCode.RIGHT_ARROW:
        this.setActiveDate(DateField.YEAR, 1, targetMode);
        break;
      case KeyCode.UP_ARROW:
        this.setActiveDate(DateField.YEAR, -5, targetMode);
        break;
      case KeyCode.DOWN_ARROW:
        this.setActiveDate(DateField.YEAR, 5, targetMode);
        break;
      case KeyCode.HOME:
        this.setActiveDate(DateField.YEAR, this.yearTable[0][0].year - this.activeDate.year, targetMode);
        break;
      case KeyCode.END:
        this.setActiveDate(DateField.YEAR, this.yearTable[4][4].year - this.activeDate.year, targetMode);
        break;
      case KeyCode.PAGE_UP:
        this.setActiveDate(DateField.YEAR, -25, targetMode);
        break;
      case KeyCode.PAGE_DOWN:
        this.setActiveDate(DateField.YEAR, 25, targetMode);
        break;
      case KeyCode.ENTER:
        this.setActiveDate(null, 0, SelectorMode.CALENDAR);
        break;
      default:
        return;
    }
  }

  onPrevMonth(): void {
    const targetMode = this.selectorMode === SelectorMode.YEAR ? SelectorMode.MONTH : this.selectorMode;
    this.setActiveDate(DateField.MONTH, -1, targetMode);
  }

  onNextMonth(): void {
    const targetMode = this.selectorMode === SelectorMode.YEAR ? SelectorMode.MONTH : this.selectorMode;
    this.setActiveDate(DateField.MONTH, 1, targetMode);
  }

  onPrevYear(): void {
    const targetMode = this.selectorMode === SelectorMode.MONTH ? SelectorMode.YEAR : this.selectorMode;
    this.setActiveDate(DateField.YEAR, -1, targetMode);
  }

  onNextYear(): void {
    const targetMode = this.selectorMode === SelectorMode.MONTH ? SelectorMode.YEAR : this.selectorMode;
    this.setActiveDate(DateField.YEAR, 1, targetMode);
  }

  onSelectMonthClicked(event): void {
    const targetMode = this.selectorMode !== SelectorMode.MONTH ? SelectorMode.MONTH : SelectorMode.CALENDAR;
    this.setActiveDate(null, 0, targetMode);
    event.stopPropagation();
  }

  onSelectYearClicked(event: any): void {
    const targetMode = this.selectorMode !== SelectorMode.YEAR ? SelectorMode.YEAR : SelectorMode.CALENDAR;
    this.setActiveDate(null, 0, targetMode);
    event.stopPropagation();
  }

  onPrevYears(event: any): void {
    this.setActiveDate(DateField.YEAR, -25, SelectorMode.YEAR);
    event.stopPropagation();
  }

  onNextYears(event: any): void {
    this.setActiveDate(DateField.YEAR, 25, SelectorMode.YEAR);
    event.stopPropagation();
  }

  onCalCellClicked(cell: ICalendarDay, event?: any): void {
    if (!cell || cell.disabled) {
      return;
    }
    this.setActiveDate(DateField.DAY, cell.dateObj.day - this.activeDate.day, SelectorMode.CALENDAR);
    this.selectDate(cell.dateObj);
    event.stopPropagation();
  }

  onMonthCellClicked(calMonth: ICalendarMonth, event?: any): void {
    if (calMonth.disabled) {
      return;
    }
    this.setActiveDate(DateField.MONTH, calMonth.nbr - this.activeDate.month, SelectorMode.CALENDAR);
    event.stopPropagation();
  }

  onYearCellClicked(calYear: ICalendarYear, event?: any): void {
    if (calYear.disabled) {
      return;
    }
    this.setActiveDate(DateField.YEAR, calYear.year - this.activeDate.year, SelectorMode.CALENDAR);
    event.stopPropagation();
  }

  onMouseEnter(calDay: ICalendarDay, event?: any): void {
    if (calDay) {
      this.hoveredDate = calDay.dateObj;
    }
    event.stopPropagation();
  }

  onMouseLeave(event: any): void {
    this.hoveredDate = null;
    event.stopPropagation();
  }

  selectDate(date: IDate): void {
    if (! this.isDisabledDate(date)) {
      this.activeDate = date;
      if (this.selectState === SelectState.START ||
          this.momentService.isBefore(DateField.DAY, this.selectedRange[0], date)) {
        this.selected.emit([date, null]);
      } else {
        this.selected.emit([this.selectedRange[0], date]);
      }
    }
  }

  getSelectedType(calDay: ICalendarDay): BorderType {
    if (! this.selectedRange) {
      return BorderType.NONE;
    }
    const compareWithStart = this.momentService.compare(DateField.DAY, this.selectedRange[0], calDay.dateObj);
    if (this.selectState === SelectState.END) {
      if (compareWithStart === 0) {
        return BorderType.CIRCLE;
      } else {
        return BorderType.NONE;
      }
    }
    const compareWithEnd = this.momentService.compare(DateField.DAY, this.selectedRange[1], calDay.dateObj);
    if (compareWithStart === 0 && compareWithEnd === 0) {
      return BorderType.CIRCLE;
    } else if (compareWithStart === 0) {
      return BorderType.HALF_CIRCLE_LEFT;
    } else if (compareWithEnd === 0) {
      return BorderType.HALF_CIRCLE_RIGHT;
    } else if (compareWithStart > 0 && compareWithEnd < 0) {
      return BorderType.SQUARE;
    } else {
      return BorderType.NONE;
    }
  }

  getHoveredType(calDay: ICalendarDay): BorderType {
    if (! calDay || ! this.hoveredDate) {
      return BorderType.NONE;
    }
    const compareWithHover = this.momentService.compare(DateField.DAY, this.hoveredDate, calDay.dateObj);
    if (! this.selectedRange) {
      return compareWithHover === 0 ? BorderType.CIRCLE : BorderType.NONE;
    } else {
      const compareHoverWithStart = this.momentService.compare(DateField.DAY, this.selectedRange[0], this.hoveredDate);
      if (this.selectedRange[1] === null) {
        const compareWithStart = this.momentService.compare(DateField.DAY, this.selectedRange[0], calDay.dateObj);
        if (compareHoverWithStart > 0) {
          if (compareWithHover === 0) {
            return BorderType.HALF_CIRCLE_RIGHT;
          } else if (compareWithHover < 0) {
            return compareWithStart === 0 ? BorderType.HALF_CIRCLE_LEFT : compareWithStart > 0 ? BorderType.SQUARE : BorderType.NONE;
          }
          // return compareWithHover === 0 ? BorderType.HALF_CIRCLE_RIGHT :
          //        compareWithHover < 0 && compareWithStart > 0 ? BorderType.SQUARE : BorderType.NONE;
        } else if (compareHoverWithStart < 0) {
          return compareWithHover === 0 ? BorderType.CIRCLE : BorderType.NONE;
        } else {
          return BorderType.NONE;
        }
      } else {
        const compareHoverWithEnd = this.momentService.compare(DateField.DAY, this.selectedRange[1], this.hoveredDate);
        return compareWithHover === 0 && (compareHoverWithStart < 0 || compareHoverWithEnd > 0) ? BorderType.CIRCLE : BorderType.NONE;
      }
    }
  }

  isActiveDate(calDay: ICalendarDay): boolean {
    return this.activeDate.day === calDay.dateObj.day && this.activeDate.month === calDay.dateObj.month &&
      this.activeDate.year === calDay.dateObj.year;
  }

  isMarkedDate(date: IDate, markedDates: IDate[]): boolean {
    for (const markedDate of markedDates) {
      if (markedDate.year === date.year && markedDate.month === date.month && markedDate.day === date.day) {
        return true;
      }
    }
    return false;
  }

  isHighlightedDate(date: IDate, weekendHighlight: boolean, highlightDates: IDate[]): boolean {
    const dayNbr: number = this.momentService.getDayNumber(date);
    if (weekendHighlight && (dayNbr === 0 || dayNbr === 6)) {
      return true;
    }
    for (const d of highlightDates) {
      if (d.year === date.year && d.month === date.month && d.day === date.day) {
        return true;
      }
    }
    return false;
  }

  isDisabledDate(date: IDate): boolean {
    return !this.momentService.dateWithinRange(date, this.options.enabledDateRange);
  }

  isActiveMonth(calMonth: ICalendarMonth): boolean {
    return this.activeDate.month === calMonth.nbr;
  }

  isDisabledMonth(month: number, year: number): boolean {
    const firstDay: IDate = {year: year, month: month, day: 1};
    const lastDay: IDate = {year: year, month: month, day: this.momentService.daysInMonth(month, year)};
    return this.isDisabledDate(firstDay) && this.isDisabledDate(lastDay);
  }

  isActiveYear(calYear: ICalendarYear): boolean {
    return this.activeDate.year === calYear.year;
  }

  isDisabledYear(year: number): boolean {
    const firstDay: IDate = {year: year, month: 1, day: 1};
    const lastDay: IDate = {year: year, month: 12, day: 31};
    return this.isDisabledDate(firstDay) && this.isDisabledDate(lastDay);
  }

  yearNotDisplayed(year: number) {
    return !this.yearTable || (year < this.yearTable[0][0].year || year > this.yearTable[4][4].year);
  }

  resetViewState(): void {
    this.viewState = '';
  }

  generateCalendar(m: number, y: number): void {
    this.dateTable = [];
    const today: IDate = this.momentService.getToday();
    const monthStart: number = this.momentService.monthStartIdx(y, m);
    const dInThisM: number = this.momentService.daysInMonth(m, y);
    const dInPrevM: number = this.momentService.daysInPrevMonth(m, y);

    let dayNbr: number = 1;
    for (let i = 1; i < 7; i++) {
      const week: ICalendarDay[] = [];
      if (i === 1) {
        const pm = dInPrevM - monthStart + 1;
        // Previous month
        for (let j = pm; j <= dInPrevM; j++) {
          week.push(null);
        }
        // Current month
        const daysLeft: number = 7 - week.length;
        for (let j = 0; j < daysLeft; j++) {
          const date: IDate = {year: y, month: m, day: dayNbr};
          week.push({
            dateObj: date,
            isToday: this.momentService.isToday(dayNbr, m, y, today),
            marked: this.isMarkedDate(date, this.options.markDates),
            highlighted: this.isHighlightedDate(
              date, this.options.weekendHighlight, this.options.highlightDates),
            disabled: this.isDisabledDate(date)
          });
          dayNbr++;
        }
      } else {
        // Rest of the weeks
        for (let j = 1; j < 8; j++) {
          if (dayNbr > dInThisM) {
            week.push(null);
          } else {
            const date = {year: y, month: m, day: dayNbr};
            week.push({
              dateObj: date,
              isToday: this.momentService.isToday(dayNbr, m, y, today),
              marked: this.isMarkedDate(date, this.options.markDates),
              highlighted: this.isHighlightedDate(
                date, this.options.weekendHighlight, this.options.highlightDates),
              disabled: this.isDisabledDate(date)
            });
          }
          dayNbr++;
        }
      }
      this.dateTable.push({week: week, weekNbr: 0});
    }
  }

  generateMonths(): void {
    const today: IDate = this.momentService.getToday();
    this.monthTable = [];
    for (let i = 1; i <= 12; i += 3) {
      const monthRow: ICalendarMonth[] = [];
      for (let j = i; j < i + 3; j++) {
        monthRow.push({
          nbr: j,
          name: this.momentService.monthLabels[j - 1],
          curMonth: j === today.month && this.visibleMonth.year === today.year,
          disabled: this.isDisabledMonth(j, this.visibleMonth.year)
        });
      }
      this.monthTable.push(monthRow);
    }
  }

  generateYears(): void {
    const today: IDate = this.momentService.getToday();
    let firstYear;
    if (!this.yearTable) {
      firstYear = this.activeDate.year;
    } else if (this.activeDate.year < this.yearTable[0][0].year) {
      firstYear = this.yearTable[0][0].year - 25;
    } else if (this.activeDate.year > this.yearTable[4][4].year) {
      firstYear = this.yearTable[4][4].year + 1;
    } else {
      return;
    }
    this.yearTable = [];
    for (let i = firstYear; i <= 20 + firstYear; i += 5) {
      const yearRow: ICalendarYear[] = [];
      for (let j = i; j < i + 5; j++) {
        yearRow.push({
          year: j,
          curYear: j === today.year,
          disabled: this.isDisabledYear(j)
        });
      }
      this.yearTable.push(yearRow);
    }
  }
}
