import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../Services/app-service.service';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TestlistComponent implements OnInit {

  getCompletedAssessments= [];
  assessmentReport;
  selectedTrackingNumber = '';

  constructor(private appService: AppServiceService) { }

  ngOnInit() {
    this.getAllCompletedAsssessments();
  }

  getAllCompletedAsssessments(){
    var talent_id  ='';
    if(localStorage.getItem('talent_id')){
      talent_id = localStorage.getItem('talent_id');
    }

    var requestObj = {
      talent_id: talent_id
    };
    this.appService.getCompletedAssessmentDetails(requestObj).subscribe((res) => {
      this.getCompletedAssessments = res['assessments'];
    })
  }

  onResultClick(item){
    this.assessmentReport = {};
    this.getAssessmentReport(item.TrackingNumber);
    this.selectedTrackingNumber = item.TrackingNumber;
  }

  getAssessmentReport(trackingNumber){
    this.appService.getAssessmentReport(trackingNumber).subscribe((res) => {
      this.assessmentReport = res;
      //this.getCompletedAssessments = res['assessments'];
    })
  }

  resumeAssessment(){
    this.appService.resumeAssessment(this.selectedTrackingNumber).subscribe((res) => {
      var response = res['accessLink'];
      window.open(response);
      //this.getCompletedAssessments = res['assessments'];
    })
  }


}
