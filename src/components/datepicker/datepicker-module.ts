import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker-component';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-component';
@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [DatepickerComponent],
    declarations: [DatepickerComponent, CalendarComponent],
    bootstrap: [DatepickerComponent]
})
export class DatepickerModule {
}
