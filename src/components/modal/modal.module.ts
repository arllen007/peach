/**
 * Created by bjpengzhilong on 2017/9/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ConfirmComponent } from './confirm.component';
import { NwModalSubject } from './modal-subject.service';
import { ModalComponent } from './modal.component';

@NgModule({
  entryComponents: [ ConfirmComponent, ModalComponent ],
  providers: [ NwModalSubject, ModalService ],
  declarations: [ ConfirmComponent, ModalComponent ],
  exports: [ ConfirmComponent, ModalComponent ],
  imports: [ CommonModule ]
})
export class ModalModule {}
