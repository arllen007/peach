/**
 * Created by bjpengzhilong on 2017/9/19.
 */
import { Directive, HostBinding, Input, OnInit, ElementRef, ContentChild } from '@angular/core';
import { PeachTabContentDirective } from './peach-tab-content.directive'

@Directive({
  selector: 'peach-tab-panel'
})
export class PeachTabPanelDirective implements OnInit {
  @Input() title: string = '';
  @Input() key: string = '';
  @ContentChild(PeachTabContentDirective) content: PeachTabContentDirective;
  constructor(private _elem: ElementRef) {
  }
  ngOnInit() {

  }
}
