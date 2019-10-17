import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss']
})
export class CreateaccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
