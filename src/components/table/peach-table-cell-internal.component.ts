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
  selector: '[peach-table-cell-internal]',
  template: `
    <ng-template *ngIf="column.cellTpl" [ngTemplateOutlet]="column.cellTpl.templateRef" [ngTemplateOutletContext]="context"></ng-template>
    <div *ngIf="!column.cellTpl">{{value}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeachTableCellInternalComponent implements OnChanges {
  @Input() row: any;
  @Input() column: PeachTableColumnDirective;
  @Input() index: number;

  context: any;
  ngOnChanges() {
    this.context = {
      $implicit: this.value,
      row: this.row,
      index: this.index
    };
  }
  get value() {
    const { field } = this.column;
    return field ? this.row[field] : null;
  }
}
