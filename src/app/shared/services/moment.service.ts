import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { IDate, IDateRange } from 'app/config/interfaces';
import { LOCALE, MOMENT_LOCALE, DEFAULT_MOMENT_LOCALE } from 'app/config/common/app.config';

export enum DateField {YEAR, MONTH, DAY}

@Injectable()
export class MomentService {

  monthLabels: string[];
  dayLabels: string[];
  curLocale: string;

  constructor(private translateService: TranslateService) {

    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      switch (this.translateService.currentLang) {
        case LOCALE.CHINESE: this.curLocale = MOMENT_LOCALE.CHINESE; break;
        case LOCALE.JAPANESE: this.curLocale = MOMENT_LOCALE.JAPANESE; break;
        case LOCALE.ENGLISH: this.curLocale = MOMENT_LOCALE.ENGLISH; break;
      }
      this.setLocale();
    });
    this.curLocale = DEFAULT_MOMENT_LOCALE;
    this.setLocale();
  }

  setLocale(): void {
    moment.locale(this.curLocale);
    this.monthLabels = moment.localeData().monthsShort();
    this.dayLabels = this.curLocale === MOMENT_LOCALE.ENGLISH ?
      moment.localeData().weekdaysShort() : moment.localeData().weekdaysMin();
  }

  getDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  getToday(): IDate {
    const date: Date = new Date();
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  getDayNumber(date: IDate): number {
    const d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
    return d.getDay();
  }

  daysInMonth(m: number, y: number): number {
    return new Date(y, m, 0).getDate();
  }

  daysInPrevMonth(m: number, y: number): number {
    const d: Date = this.getDate(y, m, 1);
    d.setMonth(d.getMonth() - 1);
    return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
  }

  monthStartIdx(y: number, m: number): number {
    // Month start index
    const d = new Date();
    d.setDate(1);
    d.setMonth(m - 1);
    d.setFullYear(y);
    return d.getDay();
  }

  isToday(d: number, m: number, y: number, today: IDate): boolean {
    return d === today.day && m === today.month && y === today.year;
  }

  isSame(dateField: DateField, d1: IDate, d2: IDate): boolean {
    return this.compare(dateField, d1, d2) === 0;
  }

  isBefore(dateField: DateField, d1: IDate, d2: IDate): boolean {
    return this.compare(dateField, d1, d2) < 0;
  }

  isAfter(dateField: DateField, d1: IDate, d2: IDate): boolean {
    return this.compare(dateField, d1, d2) > 0;
  }

  compare(dateField: DateField, d1: IDate, d2: IDate): number {
    const date1 = {...d1};
    const date2 = {...d2};
    if (dateField === DateField.MONTH) {
      date1.day = 1; date2.day = 1;
    } else if (dateField === DateField.YEAR) {
      date1.month = 1; date2.month = 1;
      date1.day = 1; date2.day = 1;
    }
    const jsDate1 = this.getDate(date1.year, date1.month, date1.day);
    const jsDate2 = this.getDate(date2.year, date2.month, date2.day);
    return jsDate2 < jsDate1 ? -1 : jsDate2 > jsDate1 ? 1 : 0;
  }

  isValidDate(dateText: string, dateFormat: string) {
    if (!dateText || dateText.trim() === '') {
      return true;
    }
    const _dateFormat = this.translateService.instant(dateFormat);
    return moment(this.removeExtraSpace(dateText), _dateFormat, true).isValid();
  }

  dateWithinRange(date: IDate, dateRange: IDateRange): boolean {
    if (!date || !dateRange) {
      return true;
    }
    const jsDate: Date = this.getDate(date.year, date.month, date.day);
    const startDate: IDate = dateRange.start;
    const endDate: IDate = dateRange.end;
    const jsStartDate: Date = this.getDate(startDate.year, startDate.month, startDate.day);
    const jsEndDate: Date = this.getDate(endDate.year, endDate.month, endDate.day);
    return jsDate >= jsStartDate && jsDate <= jsEndDate;
  }

  addCalendarDays(date: IDate, numDays: number): IDate {
    const newDate: Date = this.getDate(date.year, date.month, date.day + numDays);
    return {year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate()};
  }

  addCalendarMonths(date: IDate, numMonths: number): IDate {
    let newDate: Date = this.getDate(date.year, date.month + numMonths, date.day);
    if (newDate.getMonth() !== ((date.month - 1 + numMonths) % 12 + 12) % 12) {
      newDate = this.getDate(newDate.getFullYear(), newDate.getMonth() + 1, 0);
    }
    return {year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate()};
  }

  addCalendarYears(date: IDate, numYears: number): IDate {
    const newDate: Date = this.getDate(date.year + numYears, date.month, date.day);
    return {year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate()};
  }

  parseDate(date: string, dateFormat: string): IDate {
    if (!date || date.trim() === '') {
      return null;
    }
    const _dateFormat = this.translateService.instant(dateFormat);
    const momentDate = moment(this.removeExtraSpace(date), _dateFormat);
    return {year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date()};
  }

  formatDate(date: IDate, dateFormat: string): string {
    const _dateFormat = this.translateService.instant(dateFormat);
    return moment(this.getDate(date.year, date.month, date.day)).format(_dateFormat);
  }

  private removeExtraSpace(value: string): string {
    return value.trim().replace(/ +/g, ' ');
  }
}
