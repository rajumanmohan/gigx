import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.scss']
})
export class CompanyregistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
