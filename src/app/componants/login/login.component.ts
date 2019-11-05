import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class LoginComponent implements OnInit {
  type: any;
  loginForm: FormGroup;
  constructor(public router: Router, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    this.type = 'talent';
    this.loginForm  = this.formBuilder.group ({

    })
  }
  gigx(logtype) {
    this.type = logtype;
  }
  gotoProfile() {
    this.router.navigate(['/profile'], { queryParams: { page: 'company' } });
  }
}
