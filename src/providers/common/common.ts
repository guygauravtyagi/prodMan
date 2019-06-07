import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonProvider {

  private gamePLayObject: any;

  private gameObject: any;
  private activeFactObj: any;
  private productListObj: any;
  private equipmentListObj: any;
  /**
   * 
   */
  public mainObject = new BehaviorSubject(this.gameObject);
  public getGameObject = this.mainObject.asObservable();
  /**
   * 
   */
  public activeFactory = new BehaviorSubject(this.activeFactObj);
  public getActiveFactory = this.activeFactory.asObservable();
  /**
   * 
   */
  public productList = new BehaviorSubject(this.productListObj);
  public getProductList = this.productList.asObservable();
  /**
   * 
   */
  public equipmentList = new BehaviorSubject(this.equipmentListObj);
  public getEquipmentList = this.equipmentList.asObservable();
    
  private ticking: any;

  constructor(public http: HttpClient) {
    this.http.get("./../../assets/default.json").subscribe(data => {
        this.updateGameObject(data);
    });
    this.http.get("./../../assets/productList.json").subscribe(data => {
        this.setProductList(data);
    });
    this.http.get("./../../assets/equipmentList.json").subscribe(data => {
        this.setEquipmentList(data);
    });
    this.getGameObject.subscribe((gameObject) => {
      this.gamePLayObject = gameObject;
    });
  }

  public updateMoneySpent (spent) {
    this.gamePLayObject.totalValue = this.gamePLayObject.totalValue - spent;
  }
  
  public updateMoneyEarned (earned) {
    this.gamePLayObject.totalValue = this.gamePLayObject.totalValue + earned;
  }

  public updateGameObject(obj: any) {
    this.mainObject.next(obj)
  }

  public setActiveFactory(obj: any) {
    this.activeFactory.next(obj);
  }

  private setProductList(obj: any) {
    this.productList.next(obj);
  }

  private setEquipmentList(obj: any) {
    this.equipmentList.next(obj);
  }

  public startTick() {
    this.ticking = setInterval(this.updateChanges, 1000);
  }

  public updateFromLine (factory) {
    this.getGameObject.subscribe((data) => {
      data.factoryList.forEach(element => {
        if(element.id === factory.factoryId) {
          element = {};
          element.angular.copy(factory);
        }
      });
      this.updateGameObject(data);
    });
  }

  private updateChanges() {

  }

}
