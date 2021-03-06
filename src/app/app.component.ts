import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainNumber: string = "";
  firstNumber: string = "";
  lastResult: string = "";

  placeholderNumber: string = "0";
  operation: string = "";
  btSelect: string = "";

  opActive: boolean = false;
  didAEquals: boolean = false;

  resultTexts: string[] = [];
  lastOperation: string[] = [];



  // This one, changes the color of Operation's buttons!
  toggleColor(id: string) {
    if (id == null) {
      return;
    }
    else {
      let x = document.getElementById(id);
      if (this.opActive == true) {
        x.style.color = "#e0ae09";
        x.style.backgroundColor = "white";
      } else {
        x.style.color = "white";
        x.style.backgroundColor = "#e0ae09";
      }
    }
  }

  // Changes the input direction
  toRtl() {
    let x = document.getElementById('number-display');
    let compStyle = window.getComputedStyle(x).direction;
    if (compStyle == "ltr") {
      x.style.direction = "rtl"
    }
  }

  toLtr() {
    let x = document.getElementById('number-display');
    let compStyle = window.getComputedStyle(x).direction;
    if (compStyle == "rtl") {
      x.style.direction = "ltr"
    }
  }

  // The "magic"!
  doOperation(n1: string, o: string, n2: string) {

    n1 = String(n1).replace(',', '.');
    n2 = String(n2).replace(',', '.');
    let array = [n1, o, n2];
    this.lastOperation = [o, n2];
    let result = eval(array[0] + array[1] + " " + array[2]).toFixed(1);
    let tempResult = result.split(".");
    if (tempResult[1] == "0") {
      result = result.replace('.0', '');
    }
    this.lastResult = result;
    let SResult = String(result).replace('.', ',');
    let SN1 = String(n1).replace('.', ',');
    let SN2 = String(n2).replace('.', ',');
    this.resultTexts.unshift("The result of " + SN1 + o + SN2 + " = " + SResult);
    this.placeholderNumber = SResult;
    this.firstNumber = "";
    this.mainNumber = "";
    this.operation = "";
    this.toLtr();
    return result;

  }


  // When you click a operator button
  mathOp(operation, id: string) {
    if (this.operation !== "" && this.mainNumber == "") {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.opActive = true;
      this.btSelect = id;
      this.toggleColor(id);
      this.operation = operation;
      return;
    }
    if (this.mainNumber !== "") {
      // if it is not empty, it will sum and the result will be firstNumber, to make a new operation afterwards
      if (this.operation !== "") {
        this.firstNumber = this.doOperation(this.firstNumber, this.operation, this.mainNumber);
        this.operation = operation;
        this.opActive = false;
        this.toggleColor(this.btSelect);
        this.opActive = true;
        this.btSelect = id;
        this.toggleColor(id);
      }
      else {
        this.firstNumber = this.mainNumber;
        this.placeholderNumber = this.mainNumber.replace('.', ',');
        this.mainNumber = "";
        this.opActive = true;
        this.operation = operation;
        this.btSelect = id;
        this.toggleColor(id);
      }
    }
    // Will use the lastResult to do a new operation, after a equals!
    else if (this.lastResult !== "") {
      this.firstNumber = this.lastResult;
      this.placeholderNumber = this.lastResult.replace('.', ',');
      this.mainNumber = "";
      this.opActive = true;
      this.operation = operation;
      this.btSelect = id;
      this.toggleColor(id);
    }
    else {
      return;
    }
  }

  // When you click "%" button
  btPerc() {
    if (this.mainNumber == "") {
      return;
    }
    else if (this.mainNumber.indexOf("%") === -1 && this.mainNumber !== "" && this.opActive == true) {
      if (this.operation == "*") {
        this.mainNumber = (parseFloat(this.mainNumber) / 100).toString();
      }
      else {
        this.mainNumber = ((parseFloat(this.mainNumber) / 100) * parseFloat(this.firstNumber)).toString()
      }
    }
    else {
      this.mainNumber = "";
      this.lastResult = "0";
      this.placeholderNumber = "0";
    }
  }

  // When you click "AC" button.
  btAc() {
    if (this.lastResult !== "" || this.didAEquals == true) {
      this.resultTexts.unshift("Cleaned! Last Result = " + this.lastResult);
      this.mainNumber = "";
      this.firstNumber = "";
      this.lastResult = "";
      this.placeholderNumber = "0";
      this.operation = "";
      this.opActive = false;
      this.didAEquals = false;
      if (this.btSelect !== "") {
        this.toggleColor(this.btSelect);
      }
    }
    else if (this.mainNumber != "" || this.firstNumber != "" && this.opActive == true) {
      this.mainNumber = "";
      this.firstNumber = "";
      this.placeholderNumber = "0";
      this.operation = "";
      this.opActive = false;
      this.didAEquals = false;
      if (this.btSelect !== "") {
        this.toggleColor(this.btSelect);
      }
    }
    else {
      return;
    }
  }


  // When you click "+/-" button
  btPosNeg() {
    this.toLtr();
    if (this.mainNumber !== "") {
      this.mainNumber = (parseFloat(this.mainNumber.replace(",", ".")) * -1).toString().replace('.', ',');
    } else if (this.lastResult !== "") {
      this.mainNumber = (parseFloat(this.lastResult.replace(",", ".")) * -1).toString().replace('.', ',');
    } else {
      return;
    }
  }

  // When you click "=" button
  btEquals() {
    if (this.lastResult !== "" && this.firstNumber == "" && this.mainNumber == "") {
      this.operation = this.lastOperation[0];
      let tempNumber = this.lastOperation[1];
      this.doOperation(this.lastResult, this.operation, tempNumber);
    }
    else if (this.firstNumber == "") {
      return;
    }
    else if (this.firstNumber !== "" && this.mainNumber !== "") {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.doOperation(this.firstNumber, this.operation, this.mainNumber);
    }
    else if (this.firstNumber !== "" && this.mainNumber == "") {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.doOperation(this.firstNumber, this.operation, this.firstNumber);
    }
    else {
      alert("opa");
    }

  }

  // When you click in any number button
  addNumber(number) {
    this.toRtl();
    this.mainNumber += number;
  }

  // When you click in comma button
  btComma() {
    if (this.mainNumber.indexOf(",") === -1 && this.mainNumber !== "") {
      this.toLtr();
      this.mainNumber += ",";
    }
    else if (this.mainNumber == "" && (this.placeholderNumber == "0" || this.placeholderNumber !== "0")) {
      this.toLtr();
      this.mainNumber = "0,";
    }
    else {
      return;
    }

  }

}
