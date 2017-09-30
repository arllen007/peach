/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import {
    Component,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'peach-button',
    encapsulation: ViewEncapsulation.None,
    template: `
      <button class="peach-button" [class.peach-button-disabled]="_disabled" [class.peach-button-primary]="type === 'primary' && !_disabled" [class.peach-button-default]="type === 'default' && !_disabled" [disabled]="_disabled">{{ text }}</button>
    `,
    styleUrls: [
        './style/index.less'
    ]
})
export class PeachButtonComponent {
    @Input() text: string = 'Button';
    @Input() type: string = 'default';
    @Input() set peachDisabled(value: boolean) {
        this._disabled = value;
    }

    _disabled: boolean = false;
}