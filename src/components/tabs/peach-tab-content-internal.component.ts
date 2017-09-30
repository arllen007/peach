/**
 * Created by bjpengzhilong on 2017/9/20.
 */
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  OnChanges,
  OnInit
} from '@angular/core';
import { PeachTabPanelDirective } from './peach-tab-panel.directive';

@Component({
  selector: '[peach-tab-content-internal]',
  template: `
    <ng-template *ngIf="tabPanel.content" [ngTemplateOutlet]="tabPanel.content.templateRef" [ngTemplateOutletContext]="context"></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeachTabContentInternalComponent implements OnChanges, OnInit {
  @Input() row: any;
  @Input() tabPanel: PeachTabPanelDirective;
  @Input() index: number;

  context: any;
  ngOnChanges() {
    this.context = {
      row: this.row,
      index: this.index
    };
  }

  ngOnInit() {

  }
}
