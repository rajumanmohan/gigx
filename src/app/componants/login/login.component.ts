import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: any
  constructor(public router: Router) { }

  ngOnInit() {
    this.type = 'talent';
  }
  gigx(logtype) {
    this.type = logtype;
  }
}
