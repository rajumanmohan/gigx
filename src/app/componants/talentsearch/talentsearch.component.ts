import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talentsearch',
  templateUrl: './talentsearch.component.html',
  styleUrls: ['./talentsearch.component.scss']
})
export class TalentsearchComponent implements OnInit {
  ShowSearchScreen = true;
  ShowMyHiresScreen = false;
  ShowSavedScreen = false;
  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }
  search() {
    this.ShowSearchScreen = true;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = false;
  }

  myhires() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = true;
    this.ShowSavedScreen = false;
  }

  saved() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = true;
  }
}
