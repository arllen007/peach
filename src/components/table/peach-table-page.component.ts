/**
 * Created by bjpengzhilong on 2017/9/22.
 */
import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'peach-table-page-bar',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="peach-table-page-bar">
      <div class="peach-table-page-bar-left">
        <span>当前第{{ startIndex }}-{{endIndex}}条</span>
        <span>共{{ total }}条</span>
        <p>
          每页展示
          <select [(ngModel)]="pageSize" (change)="changePage('size')">
            <option *ngFor="let size of pageSizeList" [value]="size">{{size}}</option>
          </select>
          行
        </p>
      </div>
      <div class="peach-table-page-bar-right">
        <a class="peach-table-pre-page-btn" href="javascript:void(0)" (click)="changePage('index', 'prev')">上一页</a>
        <span>第{{ pageIndex }}页/共{{ totalPage }}页</span>
        <a class="peach-table-nex-page-btn" href="javascript:void(0)" (click)="changePage('index', 'next')">下一页</a>
        <p>
          向第
          <input type="text" [(ngModel)]="toPage" (blur)="formatPageNum()">
          页
        </p>
        <a class="peach-table-page-to-btn" href="javascript: void(0)" (click)="changePage('index', 'to')">跳转</a>
      </div>
    </div>
  `
})
export class PeachTablePageBarComponent {
  @Input() pageSizeList = [10, 20, 30, 50, 100];
  @Output() pageChange = new EventEmitter();

  @Input() set peachPageInfo(pageInfo: any) {
    this.pageIndex = pageInfo.pageIndex || 1;
    this.total = pageInfo.total || 0;
    this.startIndex = (this.pageIndex - 1) * this.pageSize + 1;
    this.endIndex = Math.min(this.startIndex + this.pageSize - 1, this.total);
    this.totalPage = Math.ceil(this.total / this.pageSize);
  }

  pageIndex = 1;
  total = 0;
  pageSize = 20;
  startIndex = 0;
  endIndex = 0;
  totalPage = 0;
  toPage: number;

  public formatPageNum() {
    let page = this.toPage;
    page = Math.abs(parseInt(page + '', 10) || 1);
    page = (page > this.totalPage ? this.totalPage : page);
    this.toPage = page;
  }
  public changePage(type, action) {
    let pageIndex;
    if (type === 'size') {
      pageIndex = 1;
    } else {
      if (action === 'prev') {
        if (this.pageIndex - 1 === 0) {
          return false;
        } else {
          pageIndex = this.pageIndex - 1;
        }
      } else if (action === 'next') {
        if (this.pageIndex + 1 > this.totalPage) {
          return false;
        } else {
          pageIndex = this.pageIndex + 1;
        }
      } else if (action === 'to') {
        pageIndex = this.toPage;
      }
    }
    this.pageChange.emit({
      pageIndex: pageIndex,
      pageSize: this.pageSize
    });
  }
}

