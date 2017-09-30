/**
 * Created by bjpengzhilong on 2017/9/29.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PeachInputComponent } from './peach-input.component';

@NgModule({
    declarations: [ PeachInputComponent ],
    exports: [ PeachInputComponent ],
    imports: [ CommonModule, FormsModule ]
})
export class PeachInputModule {}
