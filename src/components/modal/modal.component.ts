/**
 * Created by bjpengzhilong on 2017/9/6.
 */
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnDestroy,
  TemplateRef,
  ComponentFactory,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';

import { NwModalSubject } from './modal-subject.service';

@Component({
  selector: 'nw-modal',
  viewProviders: [ NwModalSubject ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="nw-modal-mask" [ngStyle]="{ 'display': !_visible ? 'none' : '' }">
      <div class="nw-modal-win">
        <a href="javascript: void(0)" class="nw-modal-close" (click)="clickCancel($event)"></a>
        <div class="nw-modal-win-body">
          <ng-template [ngTemplateOutlet]="_contentTpl"></ng-template>          
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    './modal.component.less'
  ]
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  _visible = false;
  _contentTpl: TemplateRef<any>;

  @Input() get nwVisible(): boolean {
    return this._visible;
  }
  set nwVisible(value: boolean) {
    if (this._visible === value) {
      return;
    }
    if (value) {
      this.subject.next('onShow');
    } else {
      this.subject.next('onHide');
    }
    this._visible = value;
    this.nwVisibleChange.emit(this._visible);
  }

  @Input() set nwContent(value: TemplateRef<any>) {
    this._contentTpl = value;
  }

  @Output() nwVisibleChange: EventEmitter<any> = new EventEmitter();
  @Output() nwOnCancel: EventEmitter<any> = new EventEmitter();

  constructor(private subject: NwModalSubject) {
    //Todo
  }

  clickCancel(e): void {
    this.nwOnCancel.emit(e);
    this.subject.next('onCancel');
  }

  ngOnInit() {
    //Todo
  }

  ngOnDestroy() {
    //Todo
  }

  ngAfterViewInit() {
    //Todo
  }
}
