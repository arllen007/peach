/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PeachButtonComponent } from './peach-button.component';

@NgModule({
    declarations: [ PeachButtonComponent ],
    exports: [ PeachButtonComponent ],
    imports: [ FormsModule, CommonModule ]
})
export class PeachButtonModule {}
