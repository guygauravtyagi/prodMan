import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from './../../providers/common/common';
import { LinePage } from './../line/line';

@IonicPage()
@Component({
  selector: 'page-factory',
  templateUrl: 'factory.html',
})
export class FactoryPage {

  private mainObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonProvider: CommonProvider) {

  }

  public ngOnInit() {
    this.commonProvider.getGameObject.subscribe((gameObject) => {
      this.mainObject = gameObject;
      console.log(this.mainObject);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FactoryPage');
  }

  sendToline(factoryObj) {
    this.commonProvider.setActiveFactory(factoryObj);
    this.navCtrl.push(LinePage);
  }

}
