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

  texts: any[] = [];
  lastOperation: any[];



  // This one, changes the color of Operation's buttons!
  toggleColor(id: string) {
    if (id == null) {
      return;
    }
    else {
      var x = document.getElementById(id);

      if (this.opActive == true) {
        x.style.color = "#e0ae09";
        x.style.backgroundColor = "white";
      } else {
        x.style.color = "white";
        x.style.backgroundColor = "#e0ae09";
      }
    }
  }

  // The "magic"!
  doOperation(n1: string, o: string, n2: string) {
    var array = [n1, o, n2];
    this.lastOperation = [o, n2];
    var result = eval(array[0] + array[1] + array[2]);
    this.texts.push("The result of " + n1 + o + n2 + " = " + result);
    this.placeholderNumber = result;
    this.lastResult = result;
    this.firstNumber = "";
    this.mainNumber = "";
    this.operation = "";
    return result;
  }

  // The percent "magic"!
  doPercent() {
    if (this.mainNumber) {

    }
  }

  // When you click "AC"
  btAc() {
    if (this.mainNumber !== "" || this.opActive == true) {
      this.texts.push("Cleaned! Last Result = " + this.mainNumber);
      this.mainNumber = "";
      this.firstNumber = "";
      this.placeholderNumber = "0";
      this.opActive = false;
      this.didAEquals = false;
      this.toggleColor(this.btSelect);
    }
    else if (this.didAEquals == true) {
      this.texts.push("Cleaned! Last Result = " + this.placeholderNumber);
      this.placeholderNumber = "0";
      this.didAEquals = false;
      this.lastResult = "";
      this.firstNumber = "";
    }
    else {
      return;
    }
  }


  // When you click "+/-"
  btPosNeg() {
    if (this.mainNumber !== "") {
      this.mainNumber = (parseFloat(this.mainNumber) * -1).toString();
    } else if (this.lastResult !== "") {
      this.mainNumber = (parseFloat(this.lastResult) * -1).toString();
    } else {
      return;
    }
  }

  // When you click "%"
  btPerc() {
    if (this.mainNumber == "") {
      return;
    }
    else if (this.mainNumber.indexOf("%") === -1 && this.mainNumber !== "" && this.opActive == true) {
      this.mainNumber = this.mainNumber + "%";
    }
    else {
      this.mainNumber = this.mainNumber + "%";
      this.texts.push("The result of 0 * " + this.mainNumber + " = 0");
      this.mainNumber = "";
      this.lastResult = "0";
      this.placeholderNumber = "0";
    }
  }

  // When you click "="
  btEquals() {
    if (this.lastResult !== "" && this.firstNumber == "" && this.mainNumber == "") {
      this.operation = this.lastOperation[0];
      var tempNumber = this.lastOperation[1];
      this.doOperation(this.lastResult, this.operation, tempNumber);
    }
    else if (this.firstNumber == "") {
      return;
    }
    else if (this.firstNumber !== "" && this.mainNumber !== "") {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.doOperation(this.firstNumber, this.operation, this.mainNumber);
      console.log(this.firstNumber, this.mainNumber, this.operation, this.lastResult);
    }
    else if (this.firstNumber !== "" && this.mainNumber == "") {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.doOperation(this.firstNumber, this.operation, this.firstNumber);
      console.log(this.firstNumber, this.mainNumber, this.operation, this.lastResult);
    }
    else {
      alert("opa");
    }
  }

  // When you click in some operator button
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
        this.placeholderNumber = this.mainNumber;
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
      this.placeholderNumber = this.lastResult;
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


  // When you click in number
  addNumber(number) {
    this.mainNumber = this.mainNumber + number;
  }


  // When you click in comma
  btComma() {
    if (this.mainNumber.indexOf(".") === -1 && this.mainNumber !== "") {
      this.mainNumber = this.mainNumber + ".";
    }
    else if (this.mainNumber == "" && (this.placeholderNumber == "0" || this.placeholderNumber !== "0")) {
      this.mainNumber = "0" + ".";
    }
    // else if (this.mainNumber == "" && this.placeholderNumber !== "0" && this.placeholderNumber !== "" && this.placeholderNumber.indexOf(".") === -1) {
    //   this.mainNumber = this.placeholderNumber + ".";
    // }
    else {
      return;
    }
  }

}
