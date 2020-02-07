import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../Services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class GetstartedComponent implements OnInit {
  getStartForm: FormGroup;
  submitted = false;

  // routerLink="/talentregistration"
  constructor(private fb: FormBuilder, private router: Router, private appSer: AppServiceService, private toast: ToastrService) { }
  showEye = true;
  ngOnInit() {
    window.scroll(0, 0);
    this.getStartForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }
  hidePassword() {
    this.showEye = !this.showEye;
  }
  showPassword() {
    this.showEye = false;
  }
  get f() { return this.getStartForm.controls; }
  start() {
    this.submitted = true;
    if (this.getStartForm.invalid) {
      return;
    } else {
      this.appSer.emailVerification({"email": this.getStartForm.value.email}).subscribe((res)=> {
        if(res['status']==200) {
          this.router.navigate(['/verticalstepperform'], { queryParams: { email: this.getStartForm.value.email, password: this.getStartForm.value.password },skipLocationChange: true });
        }
        else {
          this.toast.error(res['message'], "Error");
        }
      })

      // this.appSer.emailVerification(this.getStartForm.value)
      // this.router.navigate(['/talentregistration'], { queryParams: { email: this.getStartForm.value.email, password: this.getStartForm.value.password },skipLocationChange: true });
    }
  }
}
