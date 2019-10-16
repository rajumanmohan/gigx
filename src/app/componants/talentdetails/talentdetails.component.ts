import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talentdetails',
  templateUrl: './talentdetails.component.html',
  styleUrls: ['./talentdetails.component.scss']
})
export class TalentdetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
