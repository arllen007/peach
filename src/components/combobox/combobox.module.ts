/**
 * Created by bjpengzhilong on 2017/9/2.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from './combobox.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [ComboboxComponent],
  declarations: [ComboboxComponent]
})
export class ComboboxModule {
}
