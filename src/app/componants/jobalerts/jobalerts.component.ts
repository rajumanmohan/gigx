import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-jobalerts',
  templateUrl: './jobalerts.component.html',
  styleUrls: ['./jobalerts.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class JobalertsComponent implements OnInit {
  Showalert2 = true;
  Showalert1 = true;
  constructor() { }

  ngOnInit() {
  }
  hide1() {
    this.Showalert1 = false;
  }
  hide2() {
    this.Showalert2 = false;
  }
}
