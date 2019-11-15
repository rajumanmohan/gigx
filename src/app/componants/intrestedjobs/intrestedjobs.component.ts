import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-intrestedjobs',
  templateUrl: './intrestedjobs.component.html',
  styleUrls: ['./intrestedjobs.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class IntrestedjobsComponent implements OnInit {
  HideIntrestedJobs1 = true;
  HideIntrestedJobs2 = true;
  HideIntrestedJobs3 = true;
  HideIntrestedJobs4 = true;
  HideIntrestedJobs5 = true;
  HideIntrestedJobs6 = true;
  constructor(private router: Router,private toast: ToastrService) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }
  ngOnInit() {
    window.scroll(0, 0);
  }
  hide1() {
    this.HideIntrestedJobs1 = false;
  }
  hide2() {
    this.HideIntrestedJobs2 = false;

  }
  hide3() {
    this.HideIntrestedJobs3 = false;

  }
  hide4() {
    this.HideIntrestedJobs4 = false;

  }
  hide5() {
    this.HideIntrestedJobs5 = false;

  }
  hide6() {
    this.HideIntrestedJobs6 = false;

  }
}
