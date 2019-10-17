import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  page;
  edit = false;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    })
  }

  ngOnInit() {
    window.scroll(0, 0);
  }
  editProfile() {
    this.edit = true;
  }
  showData() {
    this.edit = false;
  }

}
