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
  private selectFactoryIndex: Number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonProvider: CommonProvider) {
    this.commonProvider.getGameObject.subscribe((gameObject) => {
      this.mainObject = gameObject;
    });
  }

  public ngOnInit() {

  }

  /**
   * Called in HTML
   */
  private togglerFactoryList (index) {
    this.selectFactoryIndex = index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
