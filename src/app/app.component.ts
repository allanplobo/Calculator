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
  didAEquals: boolean = false;
  operation: string = "";
  btSelect: string = "";
  texts: any[] = [];


  // Some Helper's Functions

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
    var result = eval(array[0] + array[1] + array[2]);
    this.texts.push("The result of " + n1 + o + n2 + " = " + result);
    this.firstNumber = result;
    this.mainNumber = "";
    this.placeholderNumber = result;
    return result;
  }

  // Input treatment





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

  // BUTTONS 


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
    }
    else {
      return;
    };
  }

  // When you click "="
  btEquals() {
    if (this.firstNumber == "") {
      return;
    }
    else if (this.didAEquals == false) {
      this.lastNumber = this.firstNumber;
      this.didAEquals = true;
      console.log(this.firstNumber, this.mainNumber, this.operation);
      this.opActive = false;
      this.toggleColor(this.btSelect);
      this.doOperation(this.firstNumber, this.operation, this.mainNumber);
      console.log(this.firstNumber, this.mainNumber, this.operation);
    }
    else {
      this.doOperation(this.lastNumber, this.operation, this.placeholderNumber);
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
    else if (this.mainNumber == "" && this.placeholderNumber == "0") {
      this.mainNumber = "0" + ".";
    }
    else {
      return;
    }
  }

}
