import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mainNumber: string = "";
  mainNumberTemp: string = "";
  placeholderNumber: string = "0";

  opActive: boolean = false;
  operation: string = "";

  texts: any[] = [];


  // Some Helper's Functions

  // This one, changes the color of Operation's buttons!
  toggleColor() {
    var x = document.getElementById("plusButton");
    var currentColor = window.getComputedStyle(x, null).backgroundColor;

    if (this.opActive == true) {
      x.style.color = "#e0ae09";
      x.style.backgroundColor = "white";
    } else {
      x.style.color = "white";
      x.style.backgroundColor = "#e0ae09";
    }
  }


  // Operation's buttons


  btAc() {

    if (this.mainNumber != "") {
      this.texts.push("Cleaned! Last Result = " + this.mainNumber);
      this.mainNumber = "";
      this.mainNumberTemp = "";
      this.placeholderNumber = "0";
      var x = document.getElementById("plusButton");
      this.opActive = false;
      this.toggleColor();
    }
    else {
      return;
    };
  }

  mathOp(operation) {
    if (this.mainNumber !== "") {
      this.mainNumberTemp = this.mainNumber;
      this.placeholderNumber = this.mainNumber;
      this.opActive = true;
      this.operation = operation;
      this.toggleColor();
      this.mainNumber = "";
    }
    else {
      return;
    };


  }

  btEquals() {
    if (this.mainNumberTemp == "") {
      return;
    }
    else {
      this.opActive = false;
      this.toggleColor();
      var array = [this.mainNumberTemp, this.operation, this.mainNumber];
      var result = eval(array[0] + array[1] + array[2]);
      this.texts.push("The result of " + this.mainNumberTemp + this.operation + this.mainNumber + " = " + result);
      this.mainNumber = result;
    }

  }

  addNumber(number) {
    this.mainNumber = this.mainNumber + number;
  }

  btComma() {
    if (this.mainNumber.indexOf(",") === -1) {
      this.mainNumber = this.mainNumber + ",";
    }
    else {
      return;
    }

  }

}
