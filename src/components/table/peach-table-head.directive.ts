/**
 * Created by bjpengzhilong on 2017/9/20.
 */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[peach-table-head]'
})
export class PeachTableHeadDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
