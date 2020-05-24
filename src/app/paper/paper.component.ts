import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() texts: string[] = [];

  clearPaper(){
    this.texts = [""];
  }

}
