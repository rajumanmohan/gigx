import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-talentdashboard',
  templateUrl: './talentdashboard.component.html',
  styleUrls: ['./talentdashboard.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TalentdashboardComponent implements OnInit {
  talentId; loginType;
  imgBaseUrl = "http://gigxglobal.com/talent_images/";

  constructor(private router: Router, private appSer: AppServiceService, private toast: ToastrService) {
    this.talentId = localStorage.getItem('talent_id');
    this.loginType = localStorage.getItem('industry_type');
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getTalentProfile();
  }
  talentPersonalDetails; talentJobPreference; talentFullName;
  getTalentProfile() {
    let params = {
      talent_id: this.talentId
    }
    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      this.talentFullName = res['step1'].full_name.substring(0, 2);
      this.talentJobPreference = res['step4'].jobpreferences;
    })
  }

  logout() {
    this.router.navigate(['/coverpage']);
    localStorage.clear();
  }
}
