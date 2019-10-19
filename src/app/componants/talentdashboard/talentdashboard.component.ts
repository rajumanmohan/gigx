import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talentdashboard',
  templateUrl: './talentdashboard.component.html',
  styleUrls: ['./talentdashboard.component.scss']
})
export class TalentdashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
