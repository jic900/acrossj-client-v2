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

import {
  IDate,
  IWeek,
  IMonth,
  ICalendar,
  ICalendarDay,
  ICalendarMonth,
  ICalendarYear
} from 'app/config/interfaces';
import { MomentService } from 'app/shared/services/moment.service';
import { KeyCode } from 'app/shared/util/util';
import { slideCalendar } from '../datepicker-animations';

enum SelectorMode {CALENDAR, MONTH, YEAR}
enum OffsetType {YEAR, MONTH, DAY}

@Component({
  selector: 'aj-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [slideCalendar]
})

export class CalendarComponent implements OnChanges, AfterContentInit {

  @Input() calendarData: ICalendar;
  @Input() selectedDate: IDate;
  @Output() dateSelected: EventEmitter<IDate>;
  SelectorMode: typeof SelectorMode;
  selectorMode: SelectorMode;
  dateTable: IWeek[];
  monthTable: ICalendarMonth[][];
  yearTable: ICalendarYear[][];
  visibleMonth: IMonth;
  activeDate: IDate;
  viewState: string;

  constructor(private elementRef: ElementRef, public momentService: MomentService) {
    this.SelectorMode = SelectorMode;
    this.selectorMode = SelectorMode.CALENDAR;
    this.dateSelected = new EventEmitter<IDate>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.calendarData.weekendHighlight) {
      this.calendarData.weekendHighlight = true;
    }
    if (!this.calendarData.markDates) {
      this.calendarData.markDates = [];
    }
    if (!this.calendarData.highlightDates) {
      this.calendarData.highlightDates = [];
    }
    if (!this.calendarData.showTodayBtn) {
      this.calendarData.showTodayBtn = false;
    }
    if (!this.calendarData.todayBtnTxt) {
      this.calendarData.todayBtnTxt = 'Today';
    }
  }

  ngAfterContentInit() {
    this.init();
    this.elementRef.nativeElement.focus();
  }

  init(): void {
    const date: IDate = this.selectedDate ? this.selectedDate : this.momentService.getToday();
    this.setVisibleMonth(date);
    this.activeDate = this.selectedDate ? this.selectedDate : this.momentService.getToday();
    this.generateCalendar(date.month, date.year);
  }

  setVisibleMonth(date: IDate): void {
    this.visibleMonth = {monthTxt: this.momentService.monthLabels[date.month - 1], monthNbr: date.month, year: date.year};
  }

  setActiveDate(offsetType: OffsetType, offset: number): void {
    const oldActiveDate = this.activeDate;
    if (offsetType === OffsetType.DAY) {
      this.activeDate = this.momentService.addCalendarDays(this.activeDate, offset);
    } else if (offsetType === OffsetType.MONTH) {
      this.activeDate = this.momentService.addCalendarMonths(this.activeDate, offset);
    } else {
      this.activeDate = this.momentService.addCalendarYears(this.activeDate, offset);
    }
    if (!this.momentService.isSameMonth(this.activeDate, oldActiveDate)) {
      this.setVisibleMonth(this.activeDate);
      if (this.selectorMode === SelectorMode.CALENDAR) {
        this.generateCalendar(this.activeDate.month, this.activeDate.year);
        if (this.momentService.isLaterMonth(oldActiveDate, this.activeDate)) {
          this.viewState = 'right';
        } else {
          this.viewState = 'left';
        }
      } else if (this.selectorMode === SelectorMode.YEAR && this.yearNotDisplayed(this.activeDate.year) ) {
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
    switch (event.keyCode) {
      case KeyCode.LEFT_ARROW:
        this.setActiveDate(OffsetType.DAY, -1);
        break;
      case KeyCode.RIGHT_ARROW:
        this.setActiveDate(OffsetType.DAY, 1);
        break;
      case KeyCode.UP_ARROW:
        this.setActiveDate(OffsetType.DAY, -7);
        break;
      case KeyCode.DOWN_ARROW:
        this.setActiveDate(OffsetType.DAY, 7);
        break;
      case KeyCode.HOME:
        this.setActiveDate(OffsetType.DAY, 1 - this.activeDate.day);
        break;
      case KeyCode.END:
        const daysInThisMonth = this.momentService.daysInMonth(this.activeDate.month, this.activeDate.year);
        this.setActiveDate(OffsetType.DAY, daysInThisMonth - this.activeDate.day);
        break;
      case KeyCode.PAGE_UP:
        this.setActiveDate(OffsetType.MONTH, -1);
        break;
      case KeyCode.PAGE_DOWN:
        this.setActiveDate(OffsetType.MONTH, 1);
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
          this.setActiveDate(OffsetType.MONTH, -1);
        }
        break;
      case KeyCode.RIGHT_ARROW:
        if (this.activeDate.month < 12) {
          this.setActiveDate(OffsetType.MONTH, 1);
        }
        break;
      case KeyCode.UP_ARROW:
        if (this.activeDate.month > 3) {
          this.setActiveDate(OffsetType.MONTH, -3);
        }
        break;
      case KeyCode.DOWN_ARROW:
        if (this.activeDate.month < 10) {
          this.setActiveDate(OffsetType.MONTH, 3);
        }
        break;
      case KeyCode.HOME:
        if (this.activeDate.month !== 1) {
          this.setActiveDate(OffsetType.MONTH, 1 - this.activeDate.month);
        }
        break;
      case KeyCode.END:
        if (this.activeDate.month !== 12) {
          this.setActiveDate(OffsetType.MONTH, 12 - this.activeDate.month);
        }
        break;
      case KeyCode.ENTER:
        this.selectorMode = SelectorMode.CALENDAR;
        this.generateCalendar(this.activeDate.month, this.activeDate.year);
        break;
      default:
        return;
    }
  }

  onKeyDownInYear(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KeyCode.LEFT_ARROW:
        this.setActiveDate(OffsetType.YEAR, -1);
        break;
      case KeyCode.RIGHT_ARROW:
        this.setActiveDate(OffsetType.YEAR, 1);
        break;
      case KeyCode.UP_ARROW:
        this.setActiveDate(OffsetType.YEAR, -5);
        break;
      case KeyCode.DOWN_ARROW:
        this.setActiveDate(OffsetType.YEAR, 5);
        break;
      case KeyCode.HOME:
        this.setActiveDate(OffsetType.YEAR, this.yearTable[0][0].year - this.activeDate.year);
        break;
      case KeyCode.END:
        this.setActiveDate(OffsetType.YEAR, this.yearTable[4][4].year - this.activeDate.year);
        break;
      case KeyCode.PAGE_UP:
        this.setActiveDate(OffsetType.YEAR, -25);
        break;
      case KeyCode.PAGE_DOWN:
        this.setActiveDate(OffsetType.YEAR, 25);
        break;
      case KeyCode.ENTER:
        this.selectorMode = SelectorMode.CALENDAR;
        this.generateCalendar(this.activeDate.month, this.activeDate.year);
        break;
      default:
        return;
    }
  }

  onPrevMonth(): void {
    if (this.selectorMode === SelectorMode.YEAR) {
      this.selectorMode = SelectorMode.MONTH;
      this.generateMonths();
    }
    this.setActiveDate(OffsetType.MONTH, -1);
  }

  onNextMonth(): void {
    if (this.selectorMode === SelectorMode.YEAR) {
      this.selectorMode = SelectorMode.MONTH;
      this.generateMonths();
    }
    this.setActiveDate(OffsetType.MONTH, 1);
  }

  onPrevYear(): void {
    if (this.selectorMode === SelectorMode.MONTH) {
      this.selectorMode = SelectorMode.YEAR;
      this.generateYears();
    }
    this.setActiveDate(OffsetType.YEAR, -1);
  }

  onNextYear(): void {
    if (this.selectorMode === SelectorMode.MONTH) {
      this.selectorMode = SelectorMode.YEAR;
      this.generateYears();
    }
    this.setActiveDate(OffsetType.YEAR, 1);
  }

  onSelectMonthClicked(event): void {
    this.selectorMode = this.selectorMode !== SelectorMode.MONTH ? SelectorMode.MONTH : SelectorMode.CALENDAR;
    if (this.selectorMode === SelectorMode.MONTH) {
      this.generateMonths();
    } else {
      this.generateCalendar(this.activeDate.month, this.activeDate.year);
    }
    event.stopPropagation();
  }

  onSelectYearClicked(event: any): void {
    this.selectorMode = this.selectorMode !== SelectorMode.YEAR ? SelectorMode.YEAR : SelectorMode.CALENDAR;
    if (this.selectorMode === SelectorMode.YEAR) {
      this.generateYears();
    } else {
      this.generateCalendar(this.activeDate.month, this.activeDate.year);
    }
    event.stopPropagation();
  }

  onPrevYears(event: any, year: number): void {
    event.stopPropagation();
    this.setActiveDate(OffsetType.YEAR, -25);
    // this.generateYears(year - 25);
  }

  onNextYears(event: any, year: number): void {
    event.stopPropagation();
    this.setActiveDate(OffsetType.YEAR, 25);
    // this.generateYears(year + 25);
  }

  onTodayClicked(): void {
    this.selectDate(this.momentService.getToday());
  }

  onCellClicked(cell: ICalendarDay, event?: any): void {
    if (!cell || cell.disabled) {
      return;
    }
    if (this.selectedDate && this.momentService.isSameDate(cell.dateObj, this.selectedDate)) {
      this.clearDate();
    } else {
      this.selectDate(cell.dateObj);
    }
    this.selectorMode = SelectorMode.CALENDAR;
    if (event) {
      event.stopPropagation();
    }
  }

  onMonthCellClicked(calMonth: ICalendarMonth, event?: any): void {
    if (calMonth.disabled) {
      return;
    }
    this.selectorMode = SelectorMode.CALENDAR;
    this.setActiveDate(OffsetType.MONTH, calMonth.nbr - this.activeDate.month);
    event.stopPropagation();
  }

  onYearCellClicked(calYear: ICalendarYear, event?: any): void {
    if (calYear.disabled) {
      return;
    }
    this.selectorMode = SelectorMode.CALENDAR;
    this.setActiveDate(OffsetType.YEAR, calYear.year - this.activeDate.year);
    event.stopPropagation();
  }

  selectDate(date: IDate): void {
    if (this.momentService.dateWithinRange(date, this.calendarData.enabledDateRange)) {
      // this.dateSelected.emit(this.getDateModel(date));
      this.dateSelected.emit(date);
    }
  }

  clearDate(): void {
    this.dateSelected.emit(null);
  }

  isSelectedDate(calDay: ICalendarDay): boolean {
    return !this.selectedDate || calDay.disabled ? false : this.selectedDate.day === calDay.dateObj.day &&
      this.selectedDate.month === calDay.dateObj.month && this.selectedDate.year === calDay.dateObj.year;
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
    return !this.momentService.dateWithinRange(date, this.calendarData.enabledDateRange);
  }

  isActiveMonth(calMonth: ICalendarMonth): boolean {
    return this.activeDate.month === calMonth.nbr;
  }

  isSelectedMonth(calMonth: ICalendarMonth): boolean {
    return !this.selectedDate || calMonth.disabled ? false : this.selectedDate.month === calMonth.nbr;
  }

  isDisabledMonth(month: number, year: number): boolean {
    const firstDay: IDate = {year: year, month: month, day: 1};
    const lastDay: IDate = {year: year, month: month, day: this.momentService.daysInMonth(month, year)};
    return this.isDisabledDate(firstDay) && this.isDisabledDate(lastDay);
  }

  isActiveYear(calYear: ICalendarYear): boolean {
    return this.activeDate.year === calYear.year;
  }

  isSelectedYear(calYear: ICalendarYear): boolean {
    return !this.selectedDate || calYear.disabled ? false : this.selectedDate.year === calYear.year;
  }

  isDisabledYear(year: number): boolean {
    const firstDay: IDate = {year: year, month: 1, day: 1};
    const lastDay: IDate = {year: year, month: 12, day: 31};
    return this.isDisabledDate(firstDay) && this.isDisabledDate(lastDay);
  }

  yearNotDisplayed(year: number) {
    return year < this.yearTable[0][0].year || year > this.yearTable[4][4].year;
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
            marked: this.isMarkedDate(date, this.calendarData.markDates),
            highlighted: this.isHighlightedDate(
              date, this.calendarData.weekendHighlight, this.calendarData.highlightDates),
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
              marked: this.isMarkedDate(date, this.calendarData.markDates),
              highlighted: this.isHighlightedDate(
                date, this.calendarData.weekendHighlight, this.calendarData.highlightDates),
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
