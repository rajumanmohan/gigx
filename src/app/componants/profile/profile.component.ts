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
  edit = false;
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
  }
  editProfile() {
    this.edit = true;
    
  }
  showData() {
    this.edit = false;
  }
  profileDetails = [];
  getCompanyProfile() {
    let params = {
      company_type: this.loginType,
      company_id: this.companyId
    }
    this.appSer.CompanyProfile(params).subscribe((res) => {
      this.profileDetails = res['data'];

    })
  }



}
