import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  type: any
  constructor(public router: Router) { }

  ngOnInit() {
    this.type = 'talent';
  }
  gigx(logtype) {
    this.type = logtype;
  }
}
