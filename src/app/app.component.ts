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

  doOperation(n1: string, n2: string, o1: string) {
    var array = [this.mainNumberTemp, this.operation, this.mainNumber];
    var result = eval(array[0] + array[1] + array[2]);
    var textResult = this.texts.push("The result of " + this.mainNumberTemp + this.operation + this.mainNumber + " = " + result);

    return {result, textResult};
  }


  // Operation's buttons


  mathOp(operation, id: string) {
    if (this.mainNumber !== "") {
      this.mainNumberTemp = this.mainNumber;
      this.placeholderNumber = this.mainNumber;
      this.opActive = true;
      this.operation = operation;
      this.btSelect = id;
      this.toggleColor(id);
      this.mainNumber = "";
    }
    else if (this.mainNumber !== "" && this.opActive == true) {
      this.toggleColor(id);
    };
  }

  btAc() {

    if (this.mainNumber !== "" || this.opActive == true) {
      this.texts.push("Cleaned! Last Result = " + this.mainNumber);
      this.mainNumber = "";
      this.mainNumberTemp = "";
      this.placeholderNumber = "0";
      var x = document.getElementById(this.btSelect);
      this.opActive = false;
      this.toggleColor(this.btSelect);
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
      this.toggleColor(this.btSelect);
      var x = this.doOperation(this.mainNumber, this.mainNumberTemp, this.operation);
      this.mainNumber = x.result;
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
