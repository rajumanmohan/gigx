import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talentprofile',
  templateUrl: './talentprofile.component.html',
  styleUrls: ['./talentprofile.component.scss']
})
export class TalentprofileComponent implements OnInit {
  showPersonalDetails = true;
  showEducationDetails = false;
  showWorkExperienceDetails = false;
  showBankDetails = false;
  showGigsTrackDetails = false;
  constructor() { }

  ngOnInit() {
  }
  personaldetails() {
    this.showPersonalDetails = true;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
  }

  education() {
    this.showPersonalDetails = false;
    this.showEducationDetails = true;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
  }

  workexperience() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = true;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
  }

  bankdetails() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = true;
    this.showGigsTrackDetails = false;
  }


  gigstalent() {
    this.showPersonalDetails = false ;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = true;
  }
}
