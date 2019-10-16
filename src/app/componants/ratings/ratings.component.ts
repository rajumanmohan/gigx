import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  ShowReview = true;
  ShowRating = false;
  constructor() { }

  ngOnInit() {
  }
  review() {
    this.ShowReview = true;
    this.ShowRating = false;

  }

  rating() {
    this.ShowRating = true;
    this.ShowReview = false;

  }



}
