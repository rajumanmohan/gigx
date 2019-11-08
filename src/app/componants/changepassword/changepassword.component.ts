import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class ChangepasswordComponent implements OnInit {
  talentId; loginType; companyId;
  constructor(public router: Router, private appSer: AppServiceService, private toast: ToastrService, private formBuilder: FormBuilder) {
    this.talentId = localStorage.getItem('talent_id');
    this.companyId = localStorage.getItem('company_id');
    this.loginType = localStorage.getItem('industry_type');

  }
  submitted = false;
  updatePassword: FormGroup;
  ngOnInit() {
    window.scroll(0, 0);
    this.updatePassword = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }
  get f() { return this.updatePassword.controls; }
  changePassword() {
    this.submitted = true;
    // stop here if form is invalid

    this.updatePassword.value.industry_type = this.loginType;
    if (this.updatePassword.invalid) {
      return;
    }
    if (this.updatePassword.value.new_password != this.updatePassword.value.confirmpassword) {
      this.toast.warning("New Password and Confirm Password are Mismatched", "Warning");
    }

    else {
      if (this.loginType == 'talent') {
        this.updatePassword.value.talent_id = this.talentId;
        delete this.updatePassword.value.confirmpassword;
        delete this.updatePassword.value.industry_type;
        this.appSer.updateTalentPassword(this.updatePassword.value).subscribe(res => {
          if (res['status'] == 200) {
            console.log(res);
            this.toast.success(res['message'], "Success");
            this.updatePassword.reset();
            this.submitted = false;
          }
          else {
            this.toast.error(res['message'], "error");
          }
        })
      }
      else if (this.loginType == 'company') {
        this.updatePassword.value.company_id = this.companyId;
        delete this.updatePassword.value.confirmpassword;
        this.appSer.updateCompanyPassword(this.updatePassword.value).subscribe(res => {
          if (res['status'] == 200) {
            console.log(res);
            this.toast.success(res['message'], "Success");
            this.updatePassword.reset();
            this.submitted = false;
          }
          else {
            this.toast.error(res['message'], "error");
          }
        })
      }
      else if (this.loginType == 'individual') {
        this.updatePassword.value.company_id = this.companyId;
        delete this.updatePassword.value.confirmpassword;
        this.appSer.updateCompanyPassword(this.updatePassword.value).subscribe(res => {
          if (res['status'] == 200) {
            console.log(res);
            this.toast.success(res['message'], "Success");
            this.updatePassword.reset();
            this.submitted = false;
          }
          else {
            this.toast.error(res['message'], "error");
          }
        })
      }
    }

  }



  gotoProfile() {
    if (this.loginType == 'company') {
      this.router.navigate(['/companydashboard']);
    }
    else if (this.loginType == 'individual') {
      this.router.navigate(['/companydashboard']);
    }
    else if (this.loginType == 'talent') {
      this.router.navigate(['/talentdashboard']);
    }
    return;
  }

}
