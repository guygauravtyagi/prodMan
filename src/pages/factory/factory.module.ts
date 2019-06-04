import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FactoryPage } from './factory';

@NgModule({
  declarations: [
    FactoryPage,
  ],
  imports: [
    IonicPageModule.forChild(FactoryPage),
  ],
})
export class FactoryPageModule {
  constructor(){
  }
}
