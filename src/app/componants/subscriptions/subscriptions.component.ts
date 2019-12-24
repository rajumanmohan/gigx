import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { AppServiceService } from './../../Services/app-service.service';

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
  CompanySubscriptions;
  role; talentId; companyId; loginType; planId;
  constructor(private router: Router, private toast: ToastrService, private appSer: AppServiceService) {
    this.role = localStorage.getItem('industry_type');
    this.talentId = localStorage.getItem('talent_id');
    this.companyId = localStorage.getItem('company_id');
    this.loginType = localStorage.getItem('industry_type');
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  comType;
  showTalentSubscription = false;
  showCompanySubscription = false;
  ngOnInit() {
    window.scroll(0, 0);
    this.type = this.role;
    this.getCompanySubscriptionsPlans();
  }
  gigx(logtype) {
    this.type = logtype || this.role;
  }
  submit() {
    // if (this.comType == 'company') {
    this.router.navigate(['/profile'], { queryParams: { page: this.comType } })
    // }
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
  gotohome() {
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
  // company subscription
  ServiceArr = []; FinalService = [];
  getCompanySubscriptionsPlans() {
    this.ServiceArr = [];
    this.FinalService = [];
    this.appSer.getCompanySubscriptions().subscribe((res) => {
      this.CompanySubscriptions = res['companySubscriptionPlans'];
      this.planId = res['companySubscriptionPlans'].plan_id;
      for (var i = 0; i < this.CompanySubscriptions.length; i++) {

        this.CompanySubscriptions[i].membership_name = this.CompanySubscriptions[i].membership_name;
        this.CompanySubscriptions[i].max_limit = this.CompanySubscriptions[i].max_limit;
        this.CompanySubscriptions[i].currency_code = this.CompanySubscriptions[i].currency_code;
        this.CompanySubscriptions[i].price = this.CompanySubscriptions[i].price;
        for (var j = 0; j < this.CompanySubscriptions[i].services.length; j++) {
          this.ServiceArr.push(this.CompanySubscriptions[i].services[j].service_name);



        }
        console.log("this.ServiceArr", this.ServiceArr)
        this.CompanySubscriptions[i].service_name = this.ServiceArr;
        this.FinalService = this.CompanySubscriptions[i].service_name;
        console.log("gsdgdsfhdghrtu6tu468u4666666666666666", this.FinalService);

        this.ServiceArr = [];
        console.log("this.ServicfbsjkdbfjkbeArr", this.ServiceArr)

      }
    })
  }




}
