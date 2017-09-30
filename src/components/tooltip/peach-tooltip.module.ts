/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PeachTooltipComponent } from './peach-tooltip.component';
import { PeachTooltipDirective } from './peach-tooltip.directive';

@NgModule({
    declarations: [ PeachTooltipComponent, PeachTooltipDirective ],
    exports: [ PeachTooltipComponent, PeachTooltipDirective ],
    imports: [ CommonModule, FormsModule ]
})
export class PeachTooltipModule {}
