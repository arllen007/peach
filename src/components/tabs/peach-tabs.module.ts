/**
 * Created by bjpengzhilong on 2017/9/28.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PeachTabsComponent } from './peach-tabs.component';
import { PeachTabPanelDirective } from './peach-tab-panel.directive';
import { PeachTabContentDirective } from './peach-tab-content.directive';
import { PeachTabContentInternalComponent } from './peach-tab-content-internal.component';

@NgModule({
    declarations: [ PeachTabsComponent, PeachTabPanelDirective, PeachTabContentDirective, PeachTabContentInternalComponent ],
    exports: [ PeachTabsComponent, PeachTabPanelDirective, PeachTabContentDirective, PeachTabContentInternalComponent ],
    imports: [ CommonModule, FormsModule ]
})
export class PeachTabsModule {};
