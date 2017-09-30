import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-picker',
    template: `
        <div class="nw-date-picker">
          <div class="date-picker-box">
            <input class="{{class}}" type="text" readonly [ngModel]="rangeText" placeholder="{{ placeholder }}">
            <i class="date-picker-input-icon"></i>
          </div>
          <div class="nw-datepicker" [ngStyle]="{'top': origin.top + 'px', 'left': origin.left + 'px'}" [class.nw-datepicker-hidden]="!showCalendars">
            <div class="nw-datepicker-calendar">
            <div>
                <calendar [isLeft]="true" [nwFromDate]="value" [nwToDate]="value" (dateSelected)="dateChanged($event)" [format]="format" [minDate]="minDate" [maxDate]="maxDate"></calendar></div>
            </div>
          </div>
        </div>
    `,
    styleUrls: [
      './datepicker-component.less'
    ]
})
export class DatepickerComponent implements OnInit {
    @Input() placeholder: string = '';
    @Input() class: string = '';
    @Input() position: string = 'left';
    @Input() minDate: any = moment('2016-01-01');
    @Input() maxDate: any = moment('2100-01-01');
    @Input() format: string = 'YYYY-MM-DD';
    @Output() dateSelected = new EventEmitter();

    @Input() set nwValue(value) {
        this.value = moment(value)
    }

    value: any = '';
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
        this.origin.left = width - 250;
      }
      if (this.position === 'top') {
        this.origin.top = -277;
      }
    }

    private _setRangeText() {
      this.rangeText = this.value.format(this.format);
    }

    private _toggleCalendars(value) {
        this.showCalendars = value;
    }

    public dateChanged(date) {
      this.value = date;
      this._setRangeText();
      this._toggleCalendars(false);

      this.dateSelected.emit(this.value.format(this.format));
    }
}
