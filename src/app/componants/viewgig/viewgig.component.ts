import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewgig',
  templateUrl: './viewgig.component.html',
  styleUrls: ['./viewgig.component.scss']
})
export class ViewgigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
