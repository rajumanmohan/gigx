import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  edit = false; talentId; loginType;
  editBankDetailsForm: FormGroup; submitted = false;
  constructor(private route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService, private formBuilder: FormBuilder) {

    this.talentId = localStorage.getItem('talent_id');
    this.loginType = localStorage.getItem('industry_type');
  }

  ngOnInit() {
    this.showtalentProfile();
    this.editBankDetailsForm = this.formBuilder.group({

      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      location: ['', Validators.required]
    })
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
  talentPersonalDetails = []; talentEducationDetails; talentJobDetails; talentJobPreference; talentBankDetails;
  showtalentProfile() {
    let params = {
      talent_id: this.talentId
    }
    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      this.talentEducationDetails = res['step2'].educationaldetails;
      this.talentJobDetails = res['step3'].jobdetails;
      this.talentJobPreference = res['step4'].jobpreferences;
      this.talentBankDetails = res['step5'].bankdetails[0];
      this.editBankDetailsForm = this.formBuilder.group({
        account_holder_name: [this.talentBankDetails.account_holder_name, Validators.required],
        account_number: [this.talentBankDetails.account_number, Validators.required],
        bank_name: [this.talentBankDetails.bank_name, Validators.required],
        ifsc: [this.talentBankDetails.ifsc, Validators.required],
        branch: [this.talentBankDetails.branch, Validators.required],
        location: [this.talentBankDetails.location, Validators.required],

      })
    })
  }

  get f1() { return this.editBankDetailsForm.controls; };
  addBankAccount() {
    this.submitted = true;
    if (this.editBankDetailsForm.invalid) {
      return;
    }
    this.editBankDetailsForm.value.form_type = 'step6',
      this.editBankDetailsForm.value.talent_id = this.talentId;
    this.appSer.addBankDetails(this.editBankDetailsForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        this.showtalentProfile();
        this.edit = false;
      }
      else {
        this.toast.error(res['message'], "error");
        this.edit = false;
      }
    })
  }

}
