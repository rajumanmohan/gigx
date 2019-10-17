import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-coverpage',
  templateUrl: './coverpage.component.html',
  styleUrls: ['./coverpage.component.scss']
})
export class CoverpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
