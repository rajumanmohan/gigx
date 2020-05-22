import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
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
export class RatingsComponent implements OnInit {
  ShowReview = true;
  ShowRating = false;
  profilesList =[];
  selectedProfile: any;
  ratedProfilesList = [];
  constructor(private router: Router, private toast: ToastrService, private appSer: AppServiceService) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.getRatingsOfTalentByCompany();
  }
  review() {
    this.ShowReview = true;
    this.ShowRating = false;
    this.getRatingsOfTalentByCompany();
  }

  rating() {
    this.ShowRating = true;
    this.ShowReview = false;
    this.getAllPendingProfilesForRating();
  }

  getAllPendingProfilesForRating(){
    var requestObj = {
      company_id: localStorage.company_id
    };
    this.appSer.getAllPendingProfilesForRating(requestObj).subscribe((res) => {
        this.profilesList = res['engagedGigs'];
        if(this.profilesList.length > 0){
          this.selectedProfile = this.profilesList[0];
        }
    });
  }

  getRatingsOfTalentByCompany(){
    var requestObj = {
      company_id: localStorage.company_id
    };
    this.appSer.getRatingsOfTalentByCompany(requestObj).subscribe((res) => {
        this.ratedProfilesList = res['reviews'];
    });
  }

  insertTalentRating(profile){
    if(!profile.rating || !profile.review){
      this.toast.error("Rating and Reviews are required", "error");
      return false;
    }
    var requestObj =  {
      company_id:localStorage.company_id,
      talent_id: profile.talent_id,
      rating:  profile.rating,
      review:profile.review
    };
    debugger;
    return false;
    this.appSer.insertTalentRating(requestObj).subscribe((res)=>{
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
        this.selectedProfile.submitted = true;
      } else {
        this.toast.error(res['message'], "error");
      }
    });
  }

}
