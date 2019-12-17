import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from '../../Services/app-service.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-talentprofiledetails',
  templateUrl: './talentprofiledetails.component.html',
  styleUrls: ['./talentprofiledetails.component.scss'],
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
export class TalentProfileDetailsComponent implements OnInit {
  talentId;
  postId;

  personalDetails = {};
  educationalDetails = [];
  jobDetails = [];
  jobPreferences = [];
  bankDetails = [];

  paginationIndex = 0;
  itemsPerPage = 5;
  
  constructor(public route: ActivatedRoute, private appSer: AppServiceService) { 
    this.talentId = route.snapshot.params.talentId;
    this.postId = route.snapshot.params.postId;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getProfileDetailsByTalentId();
  }

  getProfileDetailsByTalentId(){
    var requestObj = {'talent_id': this.talentId};
    this.appSer.TalentProfile(requestObj).subscribe((res) => {
        this.personalDetails = res['step1'];
        this.educationalDetails = res['step2'].educationaldetails;
        this.jobDetails = res['step3'].jobdetails;
        this.jobPreferences = res['step4'].jobpreferences;
        debugger;
    });
  }

  getSplitResultValue(value, index){
    return value ? value.split(' ')[index] : '';
  }
}