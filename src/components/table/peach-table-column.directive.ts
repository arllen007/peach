/**
 * Created by bjpengzhilong on 2017/9/19.
 */
import { Directive, HostBinding, Input, OnInit, ElementRef, ContentChild } from '@angular/core';
import { PeachTableCellDirective } from './peach-table-cell.directive';
import { PeachTableHeadDirective } from './peach-table-head.directive';

@Directive({
  selector: 'peach-table-column'
})
export class PeachTableColumnDirective implements OnInit {
  @Input() width: number;
  @Input() title: string;
  @Input() field: string;
  @Input() align: string;
  @ContentChild(PeachTableCellDirective) cellTpl: PeachTableCellDirective;
  @ContentChild(PeachTableHeadDirective) headTpl: PeachTableHeadDirective;
  constructor(private _elem: ElementRef) {
  }
  ngOnInit() {
    // console.log(this.width);
  }
}
