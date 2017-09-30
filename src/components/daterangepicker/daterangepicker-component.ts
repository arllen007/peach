import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-range-picker',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="nw-date-range-picker">
          <div class="date-range-picker-box">
            <input class="{{class}}" type="text" readonly [ngModel]="rangeText">
            <i class="date-range-picker-input-icon"></i>
          </div>
          <div class="nw-daterangepicker" [ngStyle]="{'top': origin.top + 'px', 'left': origin.left + 'px'}" [class.nw-hidden]="!showCalendars">
            <div class="nw-daterangepicker-range-keys" *ngIf="options.showRanges">
              <a href="javascript:void(0)" *ngFor="let range of options.defaultRanges" class="btn btn-link" (click)="applyPredefinedRange(range)">{{range.name}}</a>
            </div>
            <div class="nw-daterangepicker-calendars">
              <div class="nw-daterangepicker-calendars-left">
                <div>
                  <calendar [isLeft]="true" [nwFromDate]="fromDate" [nwToDate]="toDate" (rangeDate)="rangeDate($event)" [rhoverDate]="hoverDate" (dateSelected)="dateChanged($event)" [format]="options.format" [minDate]="options.minDate" [maxDate]="options.maxDate"></calendar>
                </div>
              </div>
              <div class="nw-daterangepicker-calendars-right">
                <div>
                  <calendar [nwFromDate]="fromDate" [nwToDate]="toDate" [format]="options.format" [rhoverDate]="hoverDate" (rangeDate)="rangeDate($event)" (dateSelected)="dateChanged($event)" [minDate]="options.minDate" [maxDate]="options.maxDate"></calendar>
                </div>
              </div>
            </div>
            <div class="nw-daterangepicker-btns">
              <button class="nw-daterangepicker-btn btn-cancel" (click)="cancel()">取消</button>
              <button class="nw-daterangepicker-btn btn-ok" (click)="apply()">确定</button>
            </div>
          </div>
        </div>
    `,
    styleUrls: [
      './daterangepicker-component.less'
    ]
})
export class DaterangepickerComponent implements OnInit {
    private _defaultOptions: any = {
      startDate: moment(),
      endDate: moment(),
      minDate: moment('2016-01-01'),
      maxDate: moment('2100-01-01'),
      format: 'YYYY-MM-DD',
      showRange: true,
      defaultRanges: [{
        name: '今天',
        value: {
          start: moment(),
          end: moment()
        }
      }, {
        name: '昨天',
        value: {
          start: moment().subtract(1, 'days'),
          end: moment().subtract(1, 'days')
        }
      }, {
        name: '过去7天',
        value: {
          start: moment().subtract(6, 'days'),
          end: moment()
        }
      }, {
        name: '过去30天',
        value: {
          start: moment().subtract(29, 'days'),
          end: moment()
        }
      }, {
        name: '本月',
        value: {
          start: moment().subtract(0, 'month').startOf('month'),
          end: moment().subtract(0, 'month').endOf('month')
        }
      }, {
        name: '上个月',
        value: {
          start: moment().subtract(1, 'month').startOf('month'),
          end: moment().subtract(1, 'month').endOf('month')
        }
      }]
    };

    @Input() class: string = '';
    @Input() position: string = 'left';
    //outputs
    @Output() rangeSelected = new EventEmitter();

    @Input() set nwOptions(opt) {
      this.options = Object.assign(this._defaultOptions, opt);
      this.start = moment((moment(this.options.startDate, this.options.format) || moment()).format(this.options.format), this.options.format);
      this.end = moment((moment(this.options.endDate, this.options.format) || moment()).format(this.options.format), this.options.format);
      this._setRangeText();
    }

    options: any = {};
    start: any;
    end: any;
    fromDate: any = moment();
    toDate: any = moment();
    hoverDate: any;
    showCalendars: boolean = false;
    rangeText: string = '';
    origin: any = {
      top: 35,
      left: 0
    };

    //handle outside/inside click to show rangepicker
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    handleOutsideClick(event) {
        let current: any = event.target;
        let host: any = this.elem.nativeElement;
        if (host.compareDocumentPosition) {
            if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return this._toggleCalendars(true);
            }
        } else if (host.contains) {
            if (host.contains(current)) {
                return this._toggleCalendars(true);
            }
        } else {
            do {
                if (current === host) {
                    return this._toggleCalendars(true);
                }
                current = current.parentNode;
            } while (current);
        }
        if (this.showCalendars) {
            this._toggleCalendars(false);
        }
    }
    constructor(private elem: ElementRef) {
    }

    ngOnInit() {
      let width = this.elem.nativeElement.offsetWidth;
      if (this.position === 'right') {
        this.origin.left = width - 500;
      }
      if (this.position === 'top') {
        this.origin.top = -386;
      }

      this.fromDate = this.start;
      this.toDate = this.end;
    }

    private _setRangeText() {
      this.rangeText = this.start.format(this.options.format) + ' 至 ' + this.end.format(this.options.format);
    }

    private _toggleCalendars(value) {
        this.showCalendars = value;
        if (!value) {
            this.fromDate = this.start;
            this.toDate = this.end;
        }
    }

    public dateChanged(date) {
      this.hoverDate = null;
      if (this.fromDate && this.toDate) {
        this.fromDate = date;
        this.toDate = null;
      } else {
        if (date.isBefore(this.fromDate)) {
          this.fromDate = date;
        } else {
          this.toDate = date;
        }
      }
    }

    public rangeDate(date) {
      this.hoverDate = date;
    }

    public cancel() {
      this.showCalendars = false;
      this.fromDate = this.start;
      this.toDate = this.end;
    }

    public apply() {
      if (this.fromDate && this.toDate) {
        this.start = this.fromDate;
        this.end = this.toDate;
        this._setRangeText();
        this.showCalendars = false;
        this.rangeSelected.emit({
          start: this.start,
          end: this.end
        });
      }
    }
    public applyPredefinedRange(range) {
      this.start = range.value.start;
      this.end = range.value.end;
      this._setRangeText();
      this.showCalendars = false;
      this.rangeSelected.emit({
        start: this.start,
        end: this.end
      });
    }
}
