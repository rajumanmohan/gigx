import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { DataStorageService } from '../../Services/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  forgotForm: FormGroup;

  submit = false;
  submitted = false;
  constructor(public router: Router, private appSer: AppServiceService, private toast: ToastrService,
     private formBuilder: FormBuilder, private dataStorage: DataStorageService) {

  }
  showEye = true;

  ngOnInit() {
    window.scroll(0, 0);
    this.type = 'talent';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  hidePassword() {
    this.showEye = !this.showEye;
  }
  showPassword() {
    this.showEye = false;
  }
  get f() { return this.loginForm.controls; }

  login() {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      if (this.type == 'talent') {
        this.appSer.loginTalentApi(this.loginForm.value).subscribe((res) => {

          if (res['status'] == 200) {
            console.log(res);
            this.toast.success(res['message'], "Success");
            this.loginForm.reset();
            this.submit = false;
            this.router.navigate(['/talentdashboard']);
            localStorage.setItem('talent_id', (res['talent_id']));
            localStorage.setItem('industry_type', (res['industry_type']));
            localStorage.setItem('registration_type', (res['registration_type']));
            localStorage.setItem('first_name', (res['first_name']));
            localStorage.setItem('last_name', (res['last_name']));
            this.dataStorage.loggedInUserData = localStorage;
          }
          else {
            this.toast.error(res['message'], "error");
          }
        })
      }
      else if (this.type == 'company') {
        this.appSer.loginCompanyApi(this.loginForm.value).subscribe((res) => {
          if (res['status'] == 200) {
            this.toast.success(res['message'], "Success");
            this.loginForm.reset();
            this.submit = false;
            this.router.navigate(['/companydashboard']);
            localStorage.setItem('company_id', (res['company_id']));
            localStorage.setItem('industry_type', (res['industry_type']));
            localStorage.setItem('registration_type', (res['registration_type']));
            localStorage.setItem('company_name', (res['company_name']));

            this.dataStorage.loggedInUserData = localStorage;
          }
          else {
            this.toast.error(res['message'], "error");
          }
        })
      }

    }
  }
  get f1() { return this.forgotForm.controls; }
  forgotPassword() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    this.appSer.forgotPassword(this.forgotForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
      }
      else {
        this.toast.error(res['message'], "error");
      }
    })
  }

  gigx(logtype) {
    this.type = logtype;
    this.loginForm.reset();

  }
  gotoProfile() {
    this.router.navigate(['/profile'], { queryParams: { page: 'company' } });
  }
}
