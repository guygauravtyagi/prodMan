import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonProvider {

  private gamePlayObject: any;

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
    
  private ticking: number = 2000;
  private intervalObj: any;

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
      this.gamePlayObject = gameObject;
    });
    this.updateChanges();
  }

  public updateMoneySpent (spent) {
    this.gamePlayObject.totalValue = this.gamePlayObject.totalValue - spent;
  }
  
  public updateMoneyEarned (earned) {
    this.gamePlayObject.totalValue = this.gamePlayObject.totalValue + earned;
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
    if(this.gamePlayObject) {
      this.updateProductTickCost(this.gamePlayObject);
    }
    setTimeout(() => {
      this.updateChanges();
    }, this.ticking);
  }

  private updateProductTickCost (gameObj) {
    let cost = 0;
    gameObj.factoryList.forEach(element => {
      element.lineList.forEach(subElement => {
        if(subElement.equipmentLineList && subElement.equipmentLineList.length > 0) {
          subElement.equipmentLineList.forEach(lineEquip => {
            cost = cost + (lineEquip.selectedEquipment.costPerTick * lineEquip.active);
          });
        }
      });
    });
    gameObj.totalValue = gameObj.totalValue - cost;
    if(gameObj.totalValue < 0) {
      gameObj.totalValue = 0;
    }
  }

}
