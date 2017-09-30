/**
 * Created by bjpengzhilong on 2017/9/2.
 */
import {
  Component, Input, Output, ElementRef, HostListener, HostBinding, OnInit, OnChanges,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nw-combobox',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="nw-combo-box">
      <div class="nw-combo-box-input" [ngStyle]="{width: width + 'px', height: height + 'px'}" (click)="toggleDropDown()" title="{{selectedItem.name}}">
        {{ selectedItem.name }}
        <input type="hidden" [(ngModel)]="value">
        <i></i>
      </div>
      <div class="nw-combobox-dropdown" [class.nw-hidden]="hideDropDown" [ngStyle]="{width: width + 'px', 'max-height': dropDownHeight + 'px'}">
        <div class="nw-combobox-search" *ngIf="hasFilter">
          <input type="text" [(ngModel)]="filterText">
          <i></i>
        </div>
        <ul class="nw-combobox-options">
          <li [class.nw-hidden]="_filter(item)" [class.selected]="value === item.id" class="nw-combobox-option" title="{{item.name}}" *ngFor="let item of data" (click)="_select(item)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: [
    './combobox.component.less'
  ]
})
export class ComboboxComponent implements OnInit, OnChanges {
  @Input() placeHolder: string;
  @Input() valueField: string;
  @Input() nameField: string;
  @Input() width: number;
  @Input() height: number;
  @Input() dropDownHeight: number;
  @Input() hasFilter: boolean;
  @Input() hasEmpty: boolean;
  @Input() emptyText: string;
  @Input() disabled: boolean;
  @Output() change = new EventEmitter();

  @Input() set nwData(data) {
    data = data || [];
    let tmpData = [];
    data.forEach((item) => {
      item.id = item[this.valueField];
      item.name = item[this.nameField];
      tmpData.push(item);
    });
    if (this.hasEmpty) {
      tmpData.unshift({
        id: '',
        name: this.emptyText
      });
    }
    this.data = tmpData;
    this._selectItemByValue(this.value);
  }

  @Input() set nwValue(val) {
    this.value = val;
    this._selectItemByValue(this.value);
  }

  data: any[] = [];
  hideDropDown: boolean = true;
  selectedItem = {
    id: '',
    name: ''
  };
  filterText: string = '';
  value: string = '';

  @HostListener('document: mouseover', ['$event'])
  handleOutsideClick(event) {
    let current: any = event.target;
    let host: any = this.elem.nativeElement;
    if (host.compareDocumentPosition) {
      if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return true;
      }
    } else if (host.contains) {
      if (host.contains(current)) {
        return true;
      }
    } else {
      do {
        if (current === host) {
          return true;
        }
        current = current.parentNode;
      } while (current);
    }
    if (!this.hideDropDown) {
      this.toggleDropDown();
    }
  }

  constructor(private elem: ElementRef) {
    this.placeHolder = this.placeHolder || '';
    this.valueField = this.valueField || 'id';
    this.nameField = this.nameField || 'name';
    this.width = this.width || 160;
    this.height = this.height || 35;
    this.dropDownHeight = this.dropDownHeight || 350;
    this.hasFilter = this.hasFilter || false;
    this.disabled = !!this.disabled;
    this.hasEmpty = this.hasEmpty || false;
    this.emptyText = this.emptyText || '全部选项';
  }

  ngOnInit() {
    this._selectItemByValue(this.value);
  }

  ngOnChanges(event) {
    //Todo
  }

  private _selectItemByValue(val) {
    for (let item of this.data) {
      if (item.id === this.value) {
        this.selectedItem = item;
        return;
      }
    }
  }

  private  _select(item) {
    if (this.value !== item.id) {
      this.value = item.id;
      this.selectedItem = item;
      this.change.emit({
        item: item,
        value: this.value
      });
    }
    this.toggleDropDown();
  }

  private _filter(item) {
    if (this.hasFilter) {
      if (item.name.indexOf(this.filterText) !== 0 && item.id !== '') {
        return true;
      }
    }
    return false;
  }

  public toggleDropDown() {
    this.hideDropDown = !this.hideDropDown;
    if (!this.hideDropDown) {
      this.filterText = '';
    }
  }
}
