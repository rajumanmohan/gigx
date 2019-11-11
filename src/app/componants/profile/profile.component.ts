import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  page; companyId; loginType;
  editCompanyForm: FormGroup; submit = false;
  edit = false;
  submitted = false;
  constructor(private route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService, private formBuilder: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];

    });
    this.companyId = localStorage.getItem('company_id');
    this.loginType = localStorage.getItem('industry_type');
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getCompanyProfile();
    this.editCompanyForm = this.formBuilder.group({
      company_name: [null, Validators.required],
      company_url: [null, Validators.required],
      contact_email: [null, [Validators.required, Validators.email]],
      industry_type: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      company_registration: [null, Validators.required],
      contact_person_name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });

  }
  editProfile() {
    this.edit = true;
  }
  profileDetails = []; profileFormDetails;
  get f1() { return this.editCompanyForm.controls; }
  showData() {
    // this.edit = false;
    if (this.editCompanyForm.invalid) {
      return;
    }
    this.submitted == true;
    this.getCompanyProfile();
  }
  getCompanyProfile() {
    let params = {
      company_type: this.loginType,
      company_id: this.companyId
    }
    this.appSer.CompanyProfile(params).subscribe((res) => {
      this.profileDetails = res['data'];
      this.profileFormDetails = this.profileDetails;
      this.editCompanyForm = this.formBuilder.group({
        company_name: [this.profileFormDetails.company_name, Validators.required],
        company_url: [this.profileFormDetails.company_url, Validators.required],
        contact_email: [this.profileFormDetails.contact_email, Validators.required, Validators.email],
        industry_type: [this.profileFormDetails.industry_type, Validators.required],
        country: [this.profileFormDetails.country, Validators.required],
        pincode: [this.profileFormDetails.pincode, Validators.required],
        company_registration: [this.profileFormDetails.company_registration, Validators.required],
        contact_person_name: [this.profileFormDetails.contact_person_name, Validators.required],
        designation: [this.profileFormDetails.designation, Validators.required],
        email: [this.profileFormDetails.email, Validators.required, Validators.email],
        mobile: [this.profileFormDetails.mobile, Validators.required, Validators.maxLength(10), Validators.minLength(10)]
      });
    })
  }


}
