import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinePage } from './line';

@NgModule({
  declarations: [
    LinePage,
  ],
  imports: [
    IonicPageModule.forChild(LinePage),
  ],
})
export class LinePageModule {}
