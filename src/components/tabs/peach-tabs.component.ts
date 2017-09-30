/**
 * Created by bjpengzhilong on 2017/9/28.
 */
import {
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    ContentChildren,
    OnInit,
    QueryList,
    AfterViewInit,
    AfterContentInit
} from '@angular/core';
import { PeachTabPanelDirective } from './peach-tab-panel.directive';

@Component({
    selector: 'peach-tabs',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="peach-tabs">
            <div class="peach-tabs-bar">
                <a href="javascript: void(0)" class="peach-tabs-bar-item" [class.active]="tabIndex === i" *ngFor="let tab of tabs; let i = index;" (click)="changeTab(i, tab.key)">{{ tab.title }}</a>
            </div>
          <div class="peach-tabs-content" [class.peach-tabs-show]="i === tabIndex"  *ngFor="let tab of tabs; let i = index;" [tabPanel]="tab" peach-tab-content-internal></div>
        </div>
    `,
    styleUrls: [
        './style/index.less'
    ]
})
export class PeachTabsComponent implements OnInit, AfterViewInit, AfterContentInit {
    @Output() tabChanged = new EventEmitter();
    @ContentChildren(PeachTabPanelDirective) tabs: QueryList<PeachTabPanelDirective>;

    tabIndex: number = 0;

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

    changeTab(index, key){
        if (index !== this.tabIndex) {
            this.tabIndex = index;
            this.tabChanged.emit(key);
        }
    }
}
