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
  selector: 'app-appliedprofileslist',
  templateUrl: './appliedprofileslist.component.html',
  styleUrls: ['./appliedprofileslist.component.scss'],
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
export class AppliedProfilesListComponent implements OnInit {
  postId;
  talentProfilesList = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  gigDetails ={};
  
  constructor(public route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService) { 
    this.postId = route.snapshot.params.postId;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAppliedProfilesByPostId();
  }

  getAppliedProfilesByPostId(){
    this.appSer.getAppliedTalentProfilesByPostId(this.postId).subscribe((res) => {
        this.talentProfilesList = res['talentProfiles'];
        this.gigDetails = res['gigDetails'][0];
    });
  }

  shortlistTalentByPostId(talentId){
    var requestObj = {post_id: this.postId, talent_id: talentId}
    this.appSer.shortlistTalentByPostId(requestObj).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        this.talentProfilesList =[];
        this.getAppliedProfilesByPostId();
      } else {
        this.toast.error(res['message'], "Error");

      }
  });
  }

  getSplitResultValue(value, index){
    return value ? value.split(' ')[index] : '';
  }
}