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
import { DataStorageService } from 'src/app/Services/data-storage.service';
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
  companyPostsList = [];
  paginationIndex = 0;
  itemsPerPage = 5;

  imgBaseUrl = "https://gigxglobal.com/talent_images/";
  constructor(private router: Router, private appSer: AppServiceService, private toast: ToastrService, private dataStorage: DataStorageService) {
    this.talentId = localStorage.getItem('talent_id');
    this.loginType = localStorage.getItem('industry_type');
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getTalentProfile();
    this.getCompanyPosts();
  }
  talentPersonalDetails; talentJobPreference; talentFullName; talentLastName; LastName; FirstName; profileImage; profileUrl;
  getTalentProfile() {
    let params = {
      talent_id: this.talentId
    }
    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      this.talentFullName = res['step1'].first_name.substring(0, 1);
      this.talentLastName = res['step1'].last_name.substring(0, 1);
      this.FirstName = res['step1'].first_name;
      this.LastName = res['step1'].last_name;
      this.profileImage = res['step1'].image;
      this.profileUrl = res['step1'].image_url;
      this.talentJobPreference = res['step4'].jobpreferences;
    })
  }
  viewgig() {
    this.router.navigate(['/viewgig']);

  }
  logout() {
    this.router.navigate(['/coverpage']);
    localStorage.clear();
  }
  getCompanyPosts(){
    var requestObj = {
      talent_id: this.talentId
    };
    this.appSer.getCompanyPostsForTalent(requestObj).subscribe((res) => {
        this.companyPostsList = res['jobposts'];
    });
  }

  onInterestedClick(item){
    var requestObj = {'talent_id': this.dataStorage.loggedInUserData.talent_id, 'post_id' : item.post_id}
    this.appSer.setInterestedGig(requestObj).subscribe((res)=>{
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
        item.flag = 1;
      } else {
        this.toast.error(res['message'], "error");

      }
      
      //this.createGigForm.reset();
      //this.createGigForm.markAsPristine();
    });
  }
  onNotInterestedClick(item){
    var requestObj = {'talent_id': this.dataStorage.loggedInUserData.talent_id, 'post_id' : item.post_id}
    this.appSer.deleteInterestedGig(requestObj).subscribe((res)=>{
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
        item.flag = 0;
      } else {
        this.toast.error(res['message'], "error");

      }
      
      //this.createGigForm.reset();
      //this.createGigForm.markAsPristine();
    });
  }

}
