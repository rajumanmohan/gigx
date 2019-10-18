import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.component.html',
  styleUrls: ['./companydashboard.component.scss']
})
export class CompanydashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoProfile() {
    this.router.navigate(['/profile'], { queryParams: { page: 'company' } });
  }
}
