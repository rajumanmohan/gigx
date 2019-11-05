import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class SubscriptionsComponent implements OnInit {
  type: any;
  role = sessionStorage.getItem('role');

  constructor(public router: Router) { }
  comType;
  showTalentSubscription = false;
  showCompanySubscription = false;
  ngOnInit() {
    window.scroll(0, 0);
    this.type = this.role;
  }
  gigx(logtype) {
    this.type = logtype || this.role;
  }
  submit() {
    // if (this.comType == 'company') {
    this.router.navigate(['/profile'], { queryParams: { page: this.comType } })
    // }
  }
}
