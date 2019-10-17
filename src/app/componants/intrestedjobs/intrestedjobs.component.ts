import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intrestedjobs',
  templateUrl: './intrestedjobs.component.html',
  styleUrls: ['./intrestedjobs.component.scss']
})
export class IntrestedjobsComponent implements OnInit {
  HideIntrestedJobs1 = true;
  HideIntrestedJobs2 = true;
  HideIntrestedJobs3 = true;
  HideIntrestedJobs4 = true;
  HideIntrestedJobs5 = true;
  HideIntrestedJobs6 = true;
  constructor() { }

  ngOnInit() {
  }
  hide1() {
    this.HideIntrestedJobs1 = false;
  }
  hide2() {
    this.HideIntrestedJobs2 = false;

  }
  hide3() {
    this.HideIntrestedJobs3 = false;

  }
  hide4() {
    this.HideIntrestedJobs4 = false;

  }
  hide5() {
    this.HideIntrestedJobs5 = false;

  }
  hide6() {
    this.HideIntrestedJobs6 = false;

  }
}
