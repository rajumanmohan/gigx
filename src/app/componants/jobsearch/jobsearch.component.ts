import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.scss']
})
export class JobsearchComponent implements OnInit {
  ShowListone = true;
  ShowListTwo = true;
  ShowListAll = true;
  constructor() { }

  ngOnInit() {
  }
  clear1() {
    this.ShowListone = false;
  }

  clear2() {
    this.ShowListTwo = false;
  }


  clearall() {
    this.ShowListone = false;
    this.ShowListTwo = false;
    this.ShowListAll = false;
  }
}
