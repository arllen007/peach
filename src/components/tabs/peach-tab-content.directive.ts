/**
 * Created by bjpengzhilong on 2017/9/20.
 */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[peach-tab-content]'
})
export class PeachTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
