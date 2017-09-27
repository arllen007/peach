/**
 * Created by bjpengzhilong on 2017/9/19.
 */
import {
  Component,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { PeachTableColumnDirective } from './peach-table-column.directive';

@Component({
  selector: 'peach-table',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="peach-table">
      <div class="peach-table-container">
        <div class="peach-table-main" [style.width]="width">
          <div class="peach-table-header" [style.padding-right]="height ? '16px' : '0px'" [style.padding-left]="checkbox ? '40px' : '0px'">
            <div class="peach-table-check-column" *ngIf="checkbox && !isSingleSelect">
              <table>
                <thead>
                <tr>
                  <th>
                    <input type="checkbox" [(ngModel)]="selectedAll" [value]="true" (change)="checkAll()">
                  </th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="peach-table-header-wrap">
              <table>
                <colgroup>
                  <col *ngFor="let col of columns" [style.width]="col.width ? col.width + 'px' : 'auto'">
                </colgroup>
                <thead>
                <tr>
                  <th [style.text-align]="col.align || 'left'" *ngFor="let col of columns; trackBy: columnTrackBy" peach-table-head-internal [column]="col"></th>
                </tr>
                </thead>
              </table>
            </div>
          </div>
          <div *ngIf="pageInfo.total > 0" class="peach-table-body" [style.overflow-y]="height ? 'scroll' : 'none'" [style.height]="height + 'px'" [style.padding-left]="checkbox ? '40px' : '0px'">
            <div class="peach-table-check-column" *ngIf="checkbox">
              <table>
                <tbody>
                <tr *ngFor="let item of data; trackBy: dataTrackBy; let i = index">
                  <td>
                    <input type="checkbox" [(ngModel)]="item._checked" [value]="true" (change)="rowSelectChange(i)">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="peach-table-body-wrap">
              <table>
                <colgroup>
                  <col *ngFor="let col of columns" [style.width]="col.width ? col.width + 'px' : 'auto'">
                </colgroup>
                <tbody>
                <tr *ngFor="let item of data; trackBy: dataTrackBy">
                  <td [style.text-align]="col.align || 'left'" *ngFor="let col of columns; trackBy: columnTrackBy; let i = index" peach-table-cell-internal [row]="item" [column]="col" [index]="i"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="peach-table-fixed-left">
          <div class="peach-table-header" [style.padding-right]="height ? '16px' : '0px'" [style.padding-left]="checkbox ? '40px' : '0px'">
            <div class="peach-table-check-column" *ngIf="checkbox && !isSingleSelect">
              <table>
                <thead>
                <tr>
                  <th>
                    <input type="checkbox" [(ngModel)]="selectedAll" [value]="true" (change)="checkAll()">
                  </th>
                </tr>
                </thead>
              </table>
            </div>
          </div>
          <div *ngIf="pageInfo.total > 0" class="peach-table-body" [style.overflow-y]="height ? 'scroll' : 'none'" [style.height]="height + 'px'" [style.padding-left]="checkbox ? '40px' : '0px'">
            <div class="peach-table-check-column" *ngIf="checkbox">
              <table>
                <tbody>
                <tr *ngFor="let item of data; trackBy: dataTrackBy; let i = index">
                  <td>
                    <input type="checkbox" [(ngModel)]="item._checked" [value]="true" (change)="rowSelectChange(i)">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <peach-table-page-bar *ngIf="pageInfo.total > 0" [peachPageInfo]="pageInfo" (pageChange)="onPageChange($event)"></peach-table-page-bar>
      <div *ngIf="pageInfo.total === 0 && !isLoading" class="peach-table-no-data">{{ textNoData }}</div>
      <peach-loading *ngIf="isLoading"></peach-loading>
    </div>
  `,
  styleUrls: [
    './style/index.less'
  ]
})
export class PeachTableComponent implements OnInit, AfterViewInit {
  @Input() height: number;
  @Input() trackByKey: string;
  @Input() checkbox = false;
  @Input() isSingleSelect = false;
  @Input() isLoading = false;
  @Input() textNoData = '暂无数据';
  @Output() selectionChange = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @ContentChildren(PeachTableColumnDirective) columns: QueryList<PeachTableColumnDirective>;

  data: any[] = [];
  pageInfo: any;
  width = '100%';
  get selectedAll() {
    let isAll = true;
    this.data.forEach((item) => {
      isAll = isAll && !!item._checked;
    });
    return isAll;
  }

  @Input() set peachData(value) {
    this.data = value.data || [];
    this.pageInfo = {
      total: value.total || 0,
      pageIndex: value.pageIndex || 1
    };
  }

  @Input() set peachScrollWidth(value: any) {
    if (value) {
      if (typeof value === 'number') {
        this.width = value + 'px';
      } else if (typeof value === 'string') {
        this.width = value;
      }
    }
  }

  constructor() {}
  ngOnInit() {
    // console.log(this.columns);
  }
  ngAfterViewInit() {
    // console.log(this.columns);
  }

  public columnTrackBy(index: number, column: PeachTableColumnDirective) {
    return column.field || index;
  }

  public dataTrackBy(index: number, data: any) {
    return this.trackByKey ? data[this.trackByKey] : index;
  }

  public checkAll() {
    if (this.selectedAll) {
      this.data.forEach((item) => {
        item._checked = false;
      });
    } else {
      this.data.forEach((item) => {
        item._checked = true;
      });
    }
    this.rowSelectChange();
  }

  public rowSelectChange(index?) {
    const selectedRow: any[] = [];
    if (this.isSingleSelect) {
      this.data.forEach((item, i) => {
        if (index !== i) {
          item._checked = false;
        }
      });
    }

    this.data.forEach((item) => {
      if (item._checked) {
        selectedRow.push(item);
      }
    });
    this.selectionChange.emit(selectedRow);
  }

  public onPageChange(pageInfo) {
    this.pageChange.emit(pageInfo);
  }
}
