/**
 * Created by bjpengzhilong on 2017/9/5.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const enum modalEvent {
  onShow,
  onShown,
  onHide,
  onHidden,
  onOk,
  onCancel,
  onDestroy
}

@Injectable()
export class NwModalSubject extends Subject<any> {
  modalId: string;
  eventsQueue = {};

  destroy(type: any = 'onCancel') {
    if (!this.isStopped && !this.closed) {
      this.next(type);
    }
  }

  on(eventType: string, cb: Function) {
    if (this.eventsQueue[ eventType ]) {
      this.eventsQueue[ eventType ].push(cb);
    } else {
      this.eventsQueue[ eventType ] = [ cb ];
    }
  }

  constructor() {
    super();
    this.subscribe((value: string) => {
      const eventQueue: Function[] = this.eventsQueue[ value ] || [];
      eventQueue.forEach((cb) => {
        if (cb) {
          cb();
        }
      });
    });
  }
}
