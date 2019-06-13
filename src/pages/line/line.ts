import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from './../../providers/common/common';
import { count } from 'rxjs/operator/count';
import { templateJitUrl } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-line',
  templateUrl: 'line.html',
})
export class LinePage {

  private mainObject: any;
  
  public lineListActive: boolean = true;
  public selectedLine: any;
  public selectedLineSpace: any = [];
  public equipmentList: any;
  public productList: any;
  public selectedAction: string = "add";
  private selectedEquipment: any;
  private activeFactory: any = [];
  private openAddEquipmentPopup: boolean = false;
  private openAddProductPopup: boolean = false;

  private productLineList: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public commonProvider: CommonProvider) {
    this.commonProvider.getGameObject.subscribe((gameObject) => {
      this.mainObject = gameObject;
    });
    this.commonProvider.getActiveFactory.subscribe((factory) => {
      this.activeFactory = factory;
    });
    this.commonProvider.getEquipmentList.subscribe((object) => {
      this.equipmentList = object;
    });
    this.commonProvider.getProductList.subscribe((object) => {
      this.productList = object;
    });
  }

  private prePopulateEquipments(groupEquipmentArray) {
    groupEquipmentArray.forEach(element => {
      for (let index = 0; index < element.equipGroup.length; index++) {
        this.selectedLineSpace[element.equipGroup[index].i][element.equipGroup[index].j].equipment = element.selectedEquipment;
        this.selectedLineSpace[element.equipGroup[index].i][element.equipGroup[index].j].isEmpty = false;
      }
    });
  }

  public lineSelected(index) {
    this.selectedLine = this.activeFactory.lineList[index];
    this.createLineDynamics();
    this.lineListActive = false;
    this.selectedLine.productList = JSON.parse(JSON.stringify(this.productList));
    if (this.selectedLine && this.selectedLine.groupEquipmentArray && this.selectedLine.groupEquipmentArray.length > 0) this.prePopulateEquipments(this.selectedLine.groupEquipmentArray);
  }

  private createLineDynamics() {
    if (this.selectedLine && this.selectedLine.lineSpace > 0) {
      let tempCount = this.selectedLine.lineSpace / 10;
      for (let i = 0; i < 10; i++) {
        let tempObjArr = [];
        for (let j = 0; j < tempCount; j++) {
          let tempObj = {
            isEmpty: true,
            equipment: {}
          }
          tempObjArr.push(tempObj);
        }
        this.selectedLineSpace.push(tempObjArr);
      }
    }
  }

  public buyEquipmentPopup() {
    this.closeEveryPopUp();
    this.openAddEquipmentPopup = true;
  }

  public buyProductPopup() {
    this.closeEveryPopUp();
    this.openAddProductPopup = true;
  }

  private closeEveryPopUp() {
    this.openAddEquipmentPopup = false;
    this.openAddProductPopup = false;
  }

  public updateBox(i, j) {
    switch (this.selectedAction) {
      case "add":
        if (this.selectedEquipment && this.selectedLineSpace[i][j].isEmpty) this.addEquipment(i, j);
        break;
      case "remove":
        if (this.selectedLineSpace[i][j].isEmpty === false) this.removeEquipment(i, j);
        break;
      case "move":
        if (this.selectedLineSpace[i][j].isEmpty === false) this.moveEquipment(i, j);
        break;
    }
  }

  private addEquipment(i, j) {
    let tempArr = [];
    if (this.selectedEquipment.space === 1) {
      this.selectedLineSpace[i][j].isEmpty = false;
      this.selectedLineSpace[i][j].equipment = this.selectedEquipment;
      tempArr.push({ i: i, j: j });
    } else if (this.selectedEquipment.space === 2) {
      if (this.selectedLineSpace[i][j + 1] && this.selectedLineSpace[i][j + 1].isEmpty) {
        this.selectedLineSpace[i][j].isEmpty = false;
        this.selectedLineSpace[i][j + 1].isEmpty = false;
        this.selectedLineSpace[i][j].equipment = this.selectedEquipment;
        this.selectedLineSpace[i][j + 1].equipment = this.selectedEquipment;
        tempArr.push({ i: i, j: j });
        tempArr.push({ i: i, j: j + 1 });
      }
    } else if (this.selectedEquipment.space === 3) {
      if (this.selectedLineSpace[i + 1] && this.selectedLineSpace[i][j + 1] && this.selectedLineSpace[i][j + 1].isEmpty && this.selectedLineSpace[i + 1][j].isEmpty) {
        this.selectedLineSpace[i][j].isEmpty = false;
        this.selectedLineSpace[i][j + 1].isEmpty = false;
        this.selectedLineSpace[i + 1][j].isEmpty = false;
        this.selectedLineSpace[i][j].equipment = this.selectedEquipment;
        this.selectedLineSpace[i][j + 1].equipment = this.selectedEquipment;
        this.selectedLineSpace[i + 1][j].equipment = this.selectedEquipment;
        tempArr.push({ i: i, j: j });
        tempArr.push({ i: i + 1, j: j });
        tempArr.push({ i: i, j: j + 1 });
      }
    } else if (this.selectedEquipment.space === 4) {
      if (this.selectedLineSpace[i + 1] && this.selectedLineSpace[i][j + 1] && this.selectedLineSpace[i + 1][j + 1] && this.selectedLineSpace[i][j + 1].isEmpty && this.selectedLineSpace[i + 1][j].isEmpty && this.selectedLineSpace[i + 1][j + 1].isEmpty) {
        this.selectedLineSpace[i][j].isEmpty = false;
        this.selectedLineSpace[i][j + 1].isEmpty = false;
        this.selectedLineSpace[i + 1][j].isEmpty = false;
        this.selectedLineSpace[i + 1][j + 1].isEmpty = false;
        this.selectedLineSpace[i][j].equipment = this.selectedEquipment;
        this.selectedLineSpace[i][j + 1].equipment = this.selectedEquipment;
        this.selectedLineSpace[i + 1][j].equipment = this.selectedEquipment;
        this.selectedLineSpace[i + 1][j + 1].equipment = this.selectedEquipment;
        tempArr.push({ i: i, j: j });
        tempArr.push({ i: i, j: j + 1 });
        tempArr.push({ i: i + 1, j: j });
        tempArr.push({ i: i + 1, j: j + 1 });
      }
    }
    this.updateAddition(tempArr);
  }

  private updateAddition(arr) {
    let equipmentDetails = {};
    equipmentDetails['equipGroup'] = arr;
    equipmentDetails['selectedEquipment'] = this.selectedEquipment;
    this.selectedLine.groupEquipmentArray.push(equipmentDetails);    
    if(this.selectedLine.equipmentLineList.length > 0) {
      let indexFlag = 0;
      for (let index = 0; index < this.selectedLine.equipmentLineList.length; index++) {
        if(this.selectedLine.equipmentLineList[index].selectedEquipment.name === this.selectedEquipment.name) {
          indexFlag = index +1;
        }
      }
      if(indexFlag) {
        this.selectedLine.equipmentLineList[indexFlag -1].count += 1;
      } else {
        this.selectedLine.equipmentLineList.push({
          selectedEquipment : JSON.parse(JSON.stringify(this.selectedEquipment)) ,
          count : 1,
          active : 0
        });
      }
    } else {
      this.selectedLine.equipmentLineList.push({
        selectedEquipment : JSON.parse(JSON.stringify(this.selectedEquipment)) ,
        count : 1,
        active : 0
      });
    }
    /**
     * Update for everyone
     */
    this.commonProvider.updateMoneySpent(this.selectedEquipment.buyingPrice);
  }

  private moveEquipment(i, j) {

  }

  private removeEquipment(i, j) {
    if (this.selectedLine.groupEquipmentArray && this.selectedLine.groupEquipmentArray.length > 0) {
      let temp;
      for (let index = 0; index < this.selectedLine.groupEquipmentArray.length; index++) {
        for (let indexo = 0; indexo < this.selectedLine.groupEquipmentArray[index].equipGroup.length; indexo++) {
          if (this.selectedLine.groupEquipmentArray[index].equipGroup[indexo].i === i && this.selectedLine.groupEquipmentArray[index].equipGroup[indexo].j === j) {
            temp = index;
          }
        }
      }
      if(this.selectedLine && this.selectedLine.groupEquipmentArray && this.selectedLine.groupEquipmentArray[temp] && this.selectedLine.groupEquipmentArray[temp].selectedEquipment) {
        this.commonProvider.updateMoneyEarned(this.selectedLine.groupEquipmentArray[temp].selectedEquipment.sellingPrice);
        if(this.selectedLine.equipmentLineList.length === 1 && this.selectedLine.equipmentLineList.count === 1) {
          if(this.selectedLine.equipmentLineList[0].selectedEquipment.name === this.selectedLine.groupEquipmentArray[temp].selectedEquipment.name) {
            this.selectedLine.equipmentLineList.length = 0;
          }
        } else {
          let tempIndex = 0;
          for (let index = 0; index < this.selectedLine.equipmentLineList.length; index++) {
            if(this.selectedLine.groupEquipmentArray[temp].selectedEquipment.name === this.selectedLine.equipmentLineList[index].selectedEquipment.name) {
              tempIndex = index + 1;
            }
          }
          if(tempIndex) {
            if(this.selectedLine.equipmentLineList[tempIndex - 1].count > 0) {
              this.selectedLine.equipmentLineList[tempIndex - 1].count -= 1;
            } else if (this.selectedLine.equipmentLineList[tempIndex - 1].count === 0) {
              this.selectedLine.equipmentLineList.splice(tempIndex -1, 1);
            } else {
              /**
               * Check how TF is this even possible
               */
              console.log("You just screwed the equipment list");
            }
          }
        }
      }
      this.selectedLine.groupEquipmentArray[temp].equipGroup.forEach(element => {
        this.selectedLineSpace[element.i][element.j] = {
          isEmpty: true,
          equipment: {}
        }
      });
      this.selectedLine.groupEquipmentArray.splice(temp, 1);
    }
  }

  public resetLine() {
    this.selectedLineSpace.forEach(element => {
      element.forEach(innerElement => {
        innerElement.isEmpty = true;
        innerElement.equipment = {};
      });
    });
    let temp = 0;
    this.selectedLine.equipmentLineList.forEach(element => {
      temp = temp + element.selectedEquipment.sellingPrice;
    });
    this.commonProvider.updateMoneyEarned(temp);
    this.selectedLine.groupEquipmentArray.length = 0;
    this.selectedLine.equipmentLineList.length = 0;
  }

  public updateMAD(name) {
    this.selectedAction = name;
  }

  public selectEquipment(value) {
    this.selectedEquipment = value;
  }

  public goBackToLine() {
    this.closeEveryPopUp();
  }

  public updateGameObject() {
    this.commonProvider.updateFromLine(this.activeFactory);
  }

}
