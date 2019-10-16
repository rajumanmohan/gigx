import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talentsearch',
  templateUrl: './talentsearch.component.html',
  styleUrls: ['./talentsearch.component.scss']
})
export class TalentsearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
