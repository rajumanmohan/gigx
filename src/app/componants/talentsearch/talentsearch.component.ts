import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-talentsearch',
  templateUrl: './talentsearch.component.html',
  styleUrls: ['./talentsearch.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TalentsearchComponent implements OnInit {
  ShowSearchScreen = true;
  ShowMyHiresScreen = false;
  ShowSavedScreen = false;
  constructor(private router: Router, private toast: ToastrService) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  ngOnInit() {
    window.scroll(0, 0);
  }
  search() {
    this.ShowSearchScreen = true;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = false;
  }

  myhires() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = true;
    this.ShowSavedScreen = false;
  }

  saved() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = true;
  }
  viewgig(){
    this.router.navigate(['/viewgig']);
  }
}
