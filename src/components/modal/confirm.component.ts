/**
 * Created by bjpengzhilong on 2017/9/5.
 */
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  ViewChild,
  OnDestroy,
  TemplateRef
} from '@angular/core';

import { NwModalSubject } from './modal-subject.service';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'nw-confirm',
  viewProviders: [ NwModalSubject ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="nw-confirm-mask">
      <div class="nw-confirm-win {{nwClass}}">
        <a href="javascript: void(0)" class="nw-confirm-close" (click)="subject.next('onCancel')"></a>
        <div class="nw-confirm-win-body" #confirm_content>
          <div class="nw-confirm-icon {{nwIcon}}"></div>
          <h2 class="nw-confirm-title">{{ nwTitle }}</h2>
          <p class="nw-confirm-content" [innerHTML]="_content"></p>
          <div class="nw-confirm-buttons">
            <button class="nw-confirm-ok" *ngIf="nwOkText" (click)="subject.next('onOk')">{{ nwOkText }}</button>
            <button class="nw-confirm-cancel" *ngIf="nwCancelText" (click)="subject.next('onCancel')">{{ nwCancelText }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    './confirm.component.less'
  ]
})
export class ConfirmComponent implements OnInit, OnDestroy {
  _visible: boolean = false;
  _contentTpl: TemplateRef<any>;
  _content: string = '';
  @Input() nwClass: string = '';
  @Input() nwIcon: string = 'icon-error';
  @Input() nwTitle: string = '操作有误';
  @Input() nwOkText: string;
  @Input() nwCancelText: string;
  @ViewChild('confirm_content') private contentEl: ElementRef;

  @Input()
  public get nwVisible(): boolean {
    return this._visible;
  }
  public set nwVisible(value: boolean) {
    if (this._visible === value) {
      return;
    }
    if (value) {
      this.subject.next('onShow');
    } else {
      this.subject.next('onHide');
    }
    this._visible = value;
  }

  @Input() set nwContent(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = <string> value;
    }
  }

  constructor(public subject: NwModalSubject) {}

  ngOnInit() {
    //Todo
  }

  ngOnDestroy() {
    this.subject.next('onDestory');
    this.subject.unsubscribe();
    this.subject = null;
  }
}
