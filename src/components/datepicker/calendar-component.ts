import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ViewEncapsulation } from '@angular/core';
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

@Component({
    selector: 'calendar',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="nw-calendar">
          <div class="nw-calendar-year-month">
            <a href="javascript:void(0)" class="nw-calendar-month-prev" (click)="monthChange(-1)"><i></i></a>
            <div class="nw-calendar-year-month-selects">
              <select class="nw-calendar-month-select" [(ngModel)]="month" (change)="ngOnChanges(month)">
                <option *ngFor="let m of monthList; let i = index;" [ngValue]="i">{{ m }}</option>
              </select>
              <select class="nw-calendar-year-select" [(ngModel)]="year" (change)="ngOnChanges(year)">
                <option *ngFor="let y of yearList" [class.nw-hidden]="y > year + 5" [ngValue]="y">{{ y }}</option>
              </select>
            </div>
            <a href="javascript:void(0)" class="nw-calendar-month-next" (click)="monthChange(1)"><i></i></a>
          </div>
          <div>
            <table>
              <thead>
                <th>日</th>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
              </thead>
              <tbody>
              <tr *ngFor="let week of weekList; let i = index">
                <td *ngFor="let day of weekList[i]" (click)="selectDate(day)" (mouseenter)="mouseOverDate(day)" class="clickable" [ngClass]="{'off':!isDateAvailable(day),'start-date':checkDate(day, 'start'),'end-date':checkDate(day, 'end'),'in-range':checkDate(day, 'in'),'disabled':isDisabled(day)}">
                  {{ day.format('D') }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    `,
  styleUrls: [
    './calendar-component.less'
  ]
})
export class CalendarComponent implements OnChanges, OnInit {
    @Input() isLeft: boolean;
    @Input() format: string = 'YYYY-MM-DD';
    @Input() minDate: any;
    @Input() maxDate: any;
    @Input() rhoverDate: any;
    @Output() dateSelected = new EventEmitter();
    @Output() rangeDate = new EventEmitter();

    fromDate: any = moment();
    toDate: any = moment();
    month: number;
    year: number;
    weekList: any;
    monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    yearList = [];

    @Input() set nwFromDate(value) {
      let day = value || moment();
      if (this.isLeft) {
        this.year = day.year();
        this.month = day.month();
      }
      this.fromDate = value;
    }

    @Input() set nwToDate(value) {
      let day = value || moment();
      if (!this.isLeft) {
        this.year = day.year();
        this.month = day.month();
      }
      this.toDate = value;
    }

    ngOnInit() {
        this.minDate = moment(this.minDate || moment([1900, 0, 1]).format(this.format), this.format);
        this.maxDate = moment(this.maxDate || moment([moment().year(), 11, 31, 23, 59, 59]).add(100, 'year').format(this.format), this.format);
        if (this.maxDate.isBefore(this.minDate)) {
          let temp = this.maxDate;
          this.maxDate = this.minDate;
          this.minDate = temp;
        }
        for (let y = this.minDate.year(); y <= this.maxDate.year(); y++) {
          this.yearList .push(y);
        }
        this._createCalendarGridData();
    }

    private _getWeekNumbers(monthRange: any) {
        let weekNumbers = [];
        let indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
        let dcc = Array.from(monthRange.by('day'));
        dcc.map((day: any) => {
            let ref;
            if (weekNumbers.length < 6 && (ref = day.week(), indexOf.call(weekNumbers, ref)) < 0) {
                let week = day.week();
                if (day.day() === 0 && weekNumbers.length === 0) {
                  weekNumbers.push(week - 1);
                }
                weekNumbers.push(week);
            }
        });
        return weekNumbers;
    }
    private _getWeeksRange(weeks: any, year: any, month: any) {
        let weeksRange = [];
        for (let i = 0, len = weeks.length; i < len; i++) {
            let week = weeks[i];
            let firstWeekDay, lastWeekDay;
            if (moment([year, month]).day() === 0) {
              if (i === 0) {
                firstWeekDay = moment([year, month]).subtract(1, 'week').week(week).day(0);
                lastWeekDay = moment([year, month]).subtract(1, 'week').week(week).day(6);
              } else {
                firstWeekDay = moment([year, month]).add(i - 1, 'week').week(week).day(0);
                lastWeekDay = moment([year, month]).add(i - 1, 'week').week(week).day(6);
              }
            } else {
              firstWeekDay = moment([year, month]).add(i, 'week').week(week).day(0);
              lastWeekDay = moment([year, month]).add(i, 'week').week(week).day(6);
            }
            let weekRange = moment.range(firstWeekDay, lastWeekDay);
            weeksRange.push(weekRange);
        }
        return weeksRange;
    }
    private _createCalendarGridData(): void {
        let year = this.year;
        let month = this.month;
        let startDate = moment([year, month]);
        let firstDay = moment(startDate).startOf('month');
        let endDay = moment(startDate).add(60, 'd');
        let monthRange = moment.range(firstDay, endDay);
        let weeksRange = [];
        weeksRange = this._getWeeksRange(this._getWeekNumbers(monthRange), year, month);
        let weekList = [];
        weeksRange.map(function(week) {
            let daysList = [];
            Array.from(week.by('days')).map(function(day) {
                daysList.push(day);
            });
            weekList.push(daysList);
        });
        this.weekList = weekList;
    }
    ngOnChanges(event): void {
        this._createCalendarGridData();
    }
    public isDisabled(day) {
        if (day.isBefore(moment(this.minDate, this.format)) || day.isAfter(moment(this.maxDate, this.format))) {
            return true;
        }
    }
    public isDateAvailable(day) {
        if (day.get('month') !== this.month) {
            return false;
        }
        return true;
    }

    public checkDate(day, type): boolean {
      if (this.fromDate && this.toDate) {
        if (day.isSame(this.fromDate) && type === 'start') {
          return true;
        }
        if (day.isSame(this.toDate) && type === 'end') {
          return true;
        }

        if (day.isAfter(this.fromDate) && day.isBefore(this.toDate) && type === 'in') {
          return true;
        }
      } else if (this.fromDate && this.rhoverDate) {
        if (day.isSame(this.fromDate) && type === 'start') {
          return true;
        } else if (day.isAfter(this.fromDate) && (day.isBefore(this.rhoverDate) || day.isSame(this.rhoverDate)) && type === 'in') {
          return true;
        }
      } else if (this.fromDate) {
        if (day.isSame(this.fromDate) && type === 'start') {
          return true;
        }
      }
      return false;
    }

    mouseOverDate(day) {
        if (this.toDate) {
          this.rhoverDate = null;
          return false;
        }
        if (this.rhoverDate && day.isSame(this.rhoverDate)) {
          return;
        }
        this.rangeDate.emit(day);
    }

    selectDate(day) {
        this.dateSelected.emit(day);
    }
    monthChange(value) {
        let temp;
        if (value > 0) {
          temp = moment([this.year, this.month]).add(1, 'month');
        }else {
          temp = moment([this.year, this.month]).subtract(1, 'month');
        }
        this.year = temp.year();
        this.month = temp.month();
        this.ngOnChanges(temp);
    }
}
