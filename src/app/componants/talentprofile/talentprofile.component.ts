import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-talentprofile',
  templateUrl: './talentprofile.component.html',
  styleUrls: ['./talentprofile.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TalentprofileComponent implements OnInit {
  showPersonalDetails = true;
  showEducationDetails = false;
  showWorkExperienceDetails = false;
  showBankDetails = false;
  showGigsTrackDetails = false;
  edit = false;
  constructor() { }

  ngOnInit() {
  }
  personaldetails() {
    this.showPersonalDetails = true;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
  }

  education() {
    this.showPersonalDetails = false;
    this.showEducationDetails = true;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
  }

  workexperience() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = true;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
  }

  bankdetails() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = true;
    this.showGigsTrackDetails = false;
    this.edit = false;
  }


  gigstalent() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = true;
    this.edit = false;
  }
  editProfile() {
    this.edit = true;
  }
  showData() {
    this.edit = false;
  }
}
