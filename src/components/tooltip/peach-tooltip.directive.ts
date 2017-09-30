/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[peach-tooltip-d]'
})
export class PeachTooltipDirective {
    @HostBinding('class.peach-tooltip-open') isTooltipOpen;
    constructor(public element: ElementRef) {}
}
