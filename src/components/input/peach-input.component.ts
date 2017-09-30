/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import {
    Component,
    Input,
    Output,
    forwardRef,
    ViewEncapsulation,
    EventEmitter,
    HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'peach-input',
    encapsulation: ViewEncapsulation.None,
    template: `
      <div class="peach-input-wrap" [style.width]="width + 'px'" [style.height]="height + px">
        <input type="text" *ngIf="!isMultiline" [(ngModel)]="peachValue" [placeholder]="peachPlaceholder" (blur)="_blur()">
        <textarea *ngIf="isMultiline" [(ngModel)]="peachValue" [placeholder]="peachPlaceholder" [maxlength]="maxlength"></textarea>
        <span *ngIf="maxlength && showCount" class="peach-input-count">{{ (_value || '').length }}/{{ maxlength }}</span>
      </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PeachInputComponent),
        multi: true
    }],
    styleUrls: [
        './style/index.less'
    ]
})
export class PeachInputComponent implements ControlValueAccessor{
    @Input() peachPlaceholder = '';
    @Input() width = 120;
    @Input() height = 35;
    @Input() maxlength: number;
    @Input() isMultiline: boolean;
    @Input() showCount: boolean;
    @Output() peachBlur = new EventEmitter();

    _value: string = '';
    _composing: boolean;
    _disabled: boolean;

    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    @Input() get peachDisabled(): boolean {
        return this._disabled;
    }

    set peachDisabled(value: boolean) {
        this._disabled = value;
    }

    get peachValue(): any {
        return this._value;
    }

    set peachValue(value: any) {
        if ((this._value === value) || (((this._value === undefined) || (this._value === null)) && ((value === undefined) || (value === null)))) {
            return;
        }
        this._value = value;
        if (!this._composing){
            this.onChange(value);
        }
    }

    @HostListener('compositionstart', [ '$event' ])
    compositionStart(e): void {
        this._composing = true;
    }

    @HostListener('compositionend', [ '$event' ])
    compositionEnd(e): void {
        this._composing = false;
        this.onChange(this._value);
    }

    _blur() {
        this.peachBlur.emit(this._value);
    }

    writeValue(value: any) {
        //console.log(value);
        this._value = value;
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.peachDisabled = isDisabled;
    }
}