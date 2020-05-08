import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';

  mainNumber: string = "";
  mainNumberTemp: string = "";
  placeholderNumber: string = "0";

  opActive: boolean = false;
  addActive: boolean = false;
  subActive: boolean = false;

  texts: any[] = [];


  // Some Helper's Functions

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

  btPlus() {
    if (this.mainNumber !== ""){
      this.mainNumberTemp = this.mainNumber;
      this.placeholderNumber = this.mainNumber;
      this.addActive = true;
      this.opActive = true;
      this.toggleColor();
      this.mainNumber = "";
    }
    else{
      return;
    };
    

  }

  btEquals() {
    if (this.mainNumberTemp == "") {
      return;
    }
    else{
    this.opActive = false;
    this.toggleColor();
    var plusResult = parseFloat(this.mainNumberTemp) + parseFloat(this.mainNumber);
    this.texts.push("Sum's result of " + this.mainNumberTemp + " + " + this.mainNumber + " = " + this.mainNumber);
    this.mainNumber = plusResult.toString();
    
    this.mainNumberTemp = "";
  }

  }

  // Numbers

  btOne() {
      this.mainNumber = this.mainNumber + "1";
    
  }

  btTwo() {
      this.mainNumber = this.mainNumber + "2";
  }

  btThree() {
      this.mainNumber = this.mainNumber + "3";
  }

  btFour() {
      this.mainNumber = this.mainNumber + "4";
  }

  btFive() {
      this.mainNumber = this.mainNumber + "5";
  }

  btSix() {
      this.mainNumber = this.mainNumber + "6";
  }

  btSeven() {
      this.mainNumber = this.mainNumber + "7";
  }

  btEight() {
      this.mainNumber = this.mainNumber + "8";
  }

  btNine() {
      this.mainNumber = this.mainNumber + "9";
  }

  btZero() {
      this.mainNumber = this.mainNumber + "0";
  }

  btComma() {
    if (this.mainNumber.indexOf(",") === -1 ) {
      this.mainNumber = this.mainNumber + ",";
    }
    else {
      return;
    }

  }

}
