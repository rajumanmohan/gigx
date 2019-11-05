import { ToastrService } from 'ngx-toastr';
import { transition, trigger, useAnimation } from '@angular/animations';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class CompanyregistrationComponent implements OnInit {
  strImage;
  url1;
  indType = "";
  comType = "company"
  state = "";
  company;
  compEmail;
  password;
  // compName;
  compUrl;
  contactPerson;
  email;
  designation;
  Address;
  offAddr;
  Country = "";
  Pincode;
  city = "";
  mobileCode = "";
  mobile;
  registrationForm: FormGroup;
  submitted = false;
  registerForm: FormGroup;
  individualReg: FormGroup;
  sstType = "SST Unregistered"
  mobcode = +91;
  submitted1 = false;
  constructor(private router: Router, private appSer: AppServiceService, private toast: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.registrationForm = this.fb.group({
      company_type: [''],
      industry_type: ['', Validators.required],
      contact_email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company_name: [null, Validators.required],
      company_url: [null, Validators.required],
      contact_person_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
      company_registration: [null, Validators.required],
    });
    // individual
    this.individualReg = this.fb.group({
      company_type: [''],
      industry_type: ['', Validators.required],
      password: ['', Validators.required],
      contact_person_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
    });
  }
  image;
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  changeType(type1) {
    this.comType = type1.target.value;
    this.registrationForm.reset();
    this.submitted = false;
  }
  changeType1(sst) {
    this.sstType = sst.target.value;

  }
  changeMobCode(mob) {
    this.mobcode = mob.target.value;
  }
  submit() {
    // if (this.comType == 'company') {
    this.router.navigate(['/profile'], { queryParams: { page: this.comType } })
    // }
  }
  get f() { return this.registrationForm.controls; }

  registration() {
    this.registrationForm.value.mobile_code = this.mobcode;
    this.registrationForm.value.sst = this.sstType,
      this.registrationForm.value.company_type = this.comType;
    this.registrationForm.value.company_image = this.url1;
    this.submitted = true;

    if (this.registrationForm.invalid) {
      window.scroll(0, 0);
      return;
    }
    if (this.registrationForm.value.company_image == undefined) {
      this.toast.warning("Upload image is required", "Warning");
    } else {
      this.appSer.registration(this.registrationForm.value).subscribe((res) => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.registrationForm.reset();
          this.submitted = false;
          this.url1 = '';
          this.router.navigate(['/companydashboard']);
        } else {
          this.toast.error(res['message'], "error");
        }
      })
    }
  }
  get f1() { return this.individualReg.controls; }

  registration1() {
    this.individualReg.value.company_type = this.comType;
    this.individualReg.value.company_image = this.url1;

    console.log(this.individualReg.value)

    this.submitted1 = true;
    if (this.individualReg.invalid) {
      window.scroll(0, 0);
      return;
    }
    if (this.individualReg.value.company_image == undefined) {
      this.toast.warning("Upload image is required", "Warning");
    } else {
      this.appSer.registration(this.individualReg.value).subscribe((res) => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.individualReg.reset();
          this.submitted1 = false;
          this.url1 = '';
          this.router.navigate(['/companydashboard']);
        } else {
          this.toast.error(res['message'], "error");
        }
      })
    }
  }

}
