import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobalerts',
  templateUrl: './jobalerts.component.html',
  styleUrls: ['./jobalerts.component.scss']
})
export class JobalertsComponent implements OnInit {
  Showalert2 = true;
  Showalert1 = true;
  constructor() { }

  ngOnInit() {
  }
  hide1() {
    this.Showalert1 = false;
  }
  hide2() {
    this.Showalert2 = false;
  }
}
