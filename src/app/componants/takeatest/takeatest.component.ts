import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from './../../Services/app-service.service';

@Component({
  selector: 'app-takeatest',
  templateUrl: './takeatest.component.html',
  styleUrls: ['./takeatest.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TakeatestComponent implements OnInit {
  allBatteries: any;
  constructor(private router: Router, private toast: ToastrService, private appService: AppServiceService) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.getAllBatteries();
  }
  showTest = true;
  showResult = false;
  onBatteryClick(battery) {
    this.startCandidateAssessment(battery.batteryId);
  }

  getAllBatteries(){
    this.appService.getAllBatteries().subscribe((res) => {
      this.allBatteries = res['batteriesList'];
    })
  }

  startCandidateAssessment(batteryId){
    var talent_id  ='';
    if(localStorage.getItem('talent_id')){
      talent_id = localStorage.getItem('talent_id');
    }

    var requestObj = {
      talent_id: talent_id,
      batteryId: batteryId
    };

    this.appService.startCandidateAssessment(requestObj).subscribe((res) => {
      var assessmentDetails = res['candidateAssessmentDetails'];
      window.open(assessmentDetails.accessLink);
      this.showTest = false;
      this.showResult = true;
    })
  }
}
