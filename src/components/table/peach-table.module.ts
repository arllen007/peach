/**
 * Created by bjpengzhilong on 2017/9/19.
 */
import { NgModule } from '@angular/core';
import { PeachTableComponent } from './peach-table.component';
import { PeachTableColumnDirective } from './peach-table-column.directive';
import { PeachTableCellDirective } from './peach-table-cell.directive';
import { PeachTableCellInternalComponent } from './peach-table-cell-internal.component';
import { PeachTableHeadDirective } from './peach-table-head.directive';
import { PeachTableHeadInternalComponent } from './peach-table-head-internal.component';
import { PeachTablePageBarComponent } from './peach-table-page.component';
import { PeachLoadingComponent } from './loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ PeachTableComponent, PeachTableColumnDirective, PeachTableCellDirective, PeachTableCellInternalComponent, PeachTableHeadDirective, PeachTableHeadInternalComponent, PeachTablePageBarComponent, PeachLoadingComponent ],
  exports: [ PeachTableComponent, PeachTableColumnDirective, PeachTableCellDirective, PeachTableCellInternalComponent, PeachTableHeadDirective, PeachTableHeadInternalComponent, PeachTablePageBarComponent, PeachLoadingComponent ],
  imports: [CommonModule, FormsModule]
})
export class PeachTableModule {}
