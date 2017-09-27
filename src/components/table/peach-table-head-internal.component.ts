/**
 * Created by bjpengzhilong on 2017/9/20.
 */
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  OnChanges
} from '@angular/core';
import { PeachTableColumnDirective } from './peach-table-column.directive';

@Component({
  selector: '[peach-table-head-internal]',
  template: `
    <ng-template *ngIf="column.headTpl" [ngTemplateOutlet]="column.headTpl.templateRef" [ngTemplateOutletContext]="context"></ng-template>
    <div [class] *ngIf="!column.headTpl">{{column.title}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeachTableHeadInternalComponent implements OnChanges {
  @HostBinding('attr.title')
  @Input() title: string;
  @Input() column: PeachTableColumnDirective;
  @Input() index: number;

  context: any;
  ngOnChanges() {
    this.context = {
      title: this.column.title
    };
  }
}
