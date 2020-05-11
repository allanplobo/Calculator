import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainNumber: string = "";
  firstNumber: string = "";
  lastNumber: string = "";
  placeholderNumber: string = "0";

  opActive: boolean = false;
  didAEquals: boolean = false
  operation: string = "";
  btSelect: string = "";
  texts: any[] = [];


  // Some Helper's Functions

  // This one, changes the color of Operation's buttons!
  toggleColor(id: string) {
    var x = document.getElementById(id);

    if (this.opActive == true) {
      x.style.color = "#e0ae09";
      x.style.backgroundColor = "white";
    } else {
      x.style.color = "white";
      x.style.backgroundColor = "#e0ae09";
    }
  }

  // The "magic"!
  doOperation(n1: string, n2: string, o1: string) {
    var array = [this.firstNumber, this.operation, this.mainNumber];
    var result = eval(array[0] + array[1] + array[2]);
    this.texts.push("The result of " + this.firstNumber + this.operation + this.mainNumber + " = " + result);
    this.firstNumber = result;
    this.mainNumber = "";
    this.placeholderNumber = result;
    return result;
  }

  // Input treatment



  // Operation's buttons


  mathOp(operation, id: string) {
    if (this.mainNumber !== "") {
      if (this.opActive == false) {
        this.firstNumber = this.mainNumber;
        this.placeholderNumber = this.mainNumber;
        this.opActive = true;
        this.operation = operation;
        this.btSelect = id;
        this.toggleColor(id);
        this.mainNumber = "";
      }
      else {
        this.firstNumber = this.doOperation(this.mainNumber, this.firstNumber, this.operation);
        this.operation = operation;
        this.opActive = false;
        this.toggleColor(this.btSelect);
        this.opActive = true;
        this.btSelect = id;
        this.toggleColor(id);
      }

    }
    else if (this.opActive == true) {
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.opActive = true;
      this.btSelect = id;
      this.toggleColor(id);
      this.operation = operation;
    }
  }

  btAc() {

    if (this.mainNumber !== "" || this.opActive == true) {
      this.texts.push("Cleaned! Last Result = " + this.mainNumber);
      this.mainNumber = "";
      this.firstNumber = "";
      this.placeholderNumber = "0";
      this.opActive = false;
      this.toggleColor(this.btSelect);
    }
    else {
      this.placeholderNumber = "0";
      return;
    };
  }


  btEquals() {
    if (this.firstNumber == "") {
      return;
    }
    else {
      this.lastNumber = this.firstNumber;
      this.didAEquals = true;
      console.log(this.firstNumber, this.mainNumber, this.operation);
      this.opActive = false;
      this.toggleColor(this.btSelect);
      var x = this.doOperation(this.mainNumber, this.firstNumber, this.operation);
      console.log(this.firstNumber, this.mainNumber, this.operation);
    }

  }

  addNumber(number) {
    this.mainNumber = this.mainNumber + number;
  }

  btComma() {
    if (this.mainNumber.indexOf(",") === -1) {
      this.mainNumber = this.mainNumber + ".";
    }
    else {
      return;
    }

  }

}
