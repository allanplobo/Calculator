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

  plusActive: boolean = false;

  texts: any[] = [];



  toggleColor() {
    var x = document.getElementById("plusButton");
    var currentColor = window.getComputedStyle(x, null).backgroundColor;

    if (currentColor = "#e0ae09") {
      x.style.color = "#e0ae09";
      x.style.backgroundColor = "white";
    } else {
      x.style.backgroundColor = "#e0ae09";
      x.style.color = "white";
    }
  }

  // Calculator's Buttons

  btAc() {

    if (this.mainNumber != "") {
      this.texts.push("Cleaned! Last Result = " + this.mainNumber);
      this.mainNumber = "";
      this.mainNumberTemp = "";
      var x = document.getElementById("plusButton");
      this.toggleColor();
    }
    else {
      return;
    };
  }

  // Operation's buttons

  btPlus() {
    this.mainNumberTemp = this.mainNumber;
    this.toggleColor();
    this.plusActive = true;

  }

  btEquals() {
    var plusResult = parseInt(this.mainNumberTemp) + parseInt(this.mainNumber);
    this.mainNumber = plusResult.toString();
    this.plusActive = false;
    this.texts.push("Sum's result = " + this.mainNumber);

  }

  // Numbers

  btOne() {
    if (this.plusActive = true) {
      this.mainNumber = "1";
    }
    else {
      this.mainNumber = this.mainNumber + "1";
    };
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
    if (this.mainNumber.indexOf(",") === -1 && this.mainNumber !== null) {
      this.mainNumber = this.mainNumber + ",";
    }
    else {
      return;
    }

  }

}
