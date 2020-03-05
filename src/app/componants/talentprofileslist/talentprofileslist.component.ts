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
  selector: 'app-talentprofileslist',
  templateUrl: './talentprofileslist.component.html',
  styleUrls: ['./talentprofileslist.component.scss'],
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
export class TalentProfilesListComponent implements OnInit {
  postId;
  talentProfilesList = [];
  gigDetails = {};
  paginationIndex = 0;
  itemsPerPage = 5;
  matchPercentage = 0;
  
  constructor(public route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService) { 
    this.postId = route.snapshot.params.postId;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getTalentProfilesByPostId();
  }

  getTalentProfilesByPostId(){
    this.appSer.getTalentProfilesByPostId(this.postId).subscribe((res) => {
        this.talentProfilesList = res['talentProfiles'];
        this.gigDetails = res['gigDetails'][0];
       
        for(let i =0;i<this.talentProfilesList.length;i++){
          var splitpercentage = this.talentProfilesList[i].percentage.split(".");
          this.matchPercentage = splitpercentage[0];
        }
    });
  }

  onInviteClick(item){
    var requestObj = {post_id: this.postId, talent_id: item.talent_id}
    this.appSer.inviteTalentByPostId(requestObj).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        //this.talentProfilesList =[];
        //this.getRejectedTalentProfilesByPostId();
        item.is_invited = true;
      } else {
        this.toast.error(res['message'], "Error");

      }
  });
  }

  getSplitResultValue(value, index){
    return value ? value.split(' ')[index] : '';
  }
}