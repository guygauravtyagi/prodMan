import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from './../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private mainObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonProvider: CommonProvider) {
  }

  public ngOnInit() {
    this.commonProvider.getGameObject.subscribe((gameObject) => {
      this.mainObject = gameObject;
    });
  }

  public updateGame() {
    this.commonProvider.updateGameObject(this.mainObject);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
