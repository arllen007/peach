/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import {
    Component,
    Input,
    ViewEncapsulation,
    HostBinding,
    TemplateRef,
    ContentChild,
    OnInit,
    AfterViewInit,
    ElementRef
} from '@angular/core';
import { PeachTooltipDirective } from './peach-tooltip.directive';

@Component({
    selector: 'peach-tooltip',
    encapsulation: ViewEncapsulation.None,
    template: `
      <div class="peach-tooltip">
        <ng-content></ng-content>
        <div class="peach-tooltip-content" [style.width]="width + 'px'" [ngStyle]="_tipStyle" [ngClass]="_classMap">
          <i></i>
          <div *ngIf="!peachTemplate">{{ peachTitle }}</div>
          <ng-template *ngIf="peachTemplate" [ngTemplateOutlet]="peachTemplate"></ng-template>
        </div>
      </div>
    `,
    styleUrls: [
        './style/index.less'
    ]
})
export class PeachTooltipComponent implements OnInit, AfterViewInit{
    @Input() peachTitle: string;
    @Input() width: number = 200;
    @Input() peachPlacement: string = 'bottom';
    @Input() peachClass: string;
    @Input() trigger: string = 'hover';
    @ContentChild('peachTemplate') peachTemplate: TemplateRef<any>;
    @ContentChild(PeachTooltipDirective) content;

    _tipStyle: any = {};
    _prefix: string = 'peach-tooltip';
    _classMap: any = {};

    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {
        //
    }

    ngAfterViewInit() {
        const ele = this.content.element.nativeElement,
            width = ele.offsetWidth,
            height = ele.offsetHeight,
            tipDom = this.elementRef.nativeElement.querySelector('.peach-tooltip-content'),
            tipWidth = tipDom.offsetWidth,
            tipHeight = tipDom.offsetHeight;
        let mt, ml;
        switch (this.peachPlacement) {
            case 'bottom':
                mt = (height + 7) + 'px';
                ml = (width - tipWidth) / 2 +'px';
                break;
            case 'bottomLeft':
                mt = (height + 7) + 'px';
                ml = '-7px';
                break;
            case 'bottomRight':
                mt = (height + 7) + 'px';
                ml = (width - tipWidth + 7) + 'px';
                break;
            case 'top':
                mt = (- tipHeight - 7) + 'px';
                ml = (width - tipWidth) / 2 +'px';
                break;
            case 'topLeft':
                mt = (- tipHeight - 7) + 'px';
                ml = '-7px';
                break;
            case 'topRight':
                mt = (- tipHeight - 7) + 'px';
                ml = (width - tipWidth + 7) + 'px';
                break;
            case 'left':
                mt = (height - tipHeight) / 2 + 'px';
                ml = (-tipWidth - 7) + 'px';
                break;
            case 'leftTop':
                mt = '-7px';
                ml = (-tipWidth - 7) + 'px';
                break;
            case 'leftBottom':
                mt = (height - tipHeight + 7) + 'px';
                ml = (-tipWidth - 7) + 'px';
                break;
            case 'right':
                mt = (height - tipHeight) / 2 + 'px';
                ml = (width + 7) + 'px';
                break;
            case 'rightTop':
                mt = '-7px';
                ml = (width + 7) + 'px';
                break;
            case 'rightBottom':
                mt = (height - tipHeight + 7) + 'px';
                ml = (width + 7) + 'px';
                break;
        }

        this._tipStyle = {
            'margin-top': mt,
            'margin-left': ml
        };
        this._classMap = {
            [this.peachClass]: true,
            [`${this._prefix}-${this.peachPlacement}`]: true
        };
    }

    show(): void {
        this.content.isTooltipOpen = true;
    }

    hide(): void {
        this.content.isTooltipOpen = false;
    }
}