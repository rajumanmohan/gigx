import { Component, OnInit } from '@angular/core';
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
  constructor() { }

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
}
