import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
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
@Pipe({ name: 'safe' })
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
  submitted5 = false;
  showBankForm = false;
  editBankDetailsForm: FormGroup;
  registrationForm: FormGroup;
  addBankDetails = true;
  talentId; loginType;
  edit = true;
  submitted = false;
  url2;
  gender = "Male";
  url3;
  selDate;
  mobile_code;
  url1;
  object1 = {};
  mydate;
  CountiresList;
  stateId; citiesList;
  constructor(private route: ActivatedRoute, private router: Router, private appSer: AppServiceService, private toast: ToastrService, private fb: FormBuilder) {
    this.talentId = localStorage.getItem('talent_id');
    this.loginType = localStorage.getItem('industry_type');
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  stepone_details = {};

  ngOnInit() {
    window.scroll(0, 0);
    this.editBankDetailsForm = this.fb.group({
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      location: ['', Validators.required]
    })
    let d: Date = new Date('2001/04/05');
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile_code: ['60'],
      mobile: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      location: ['', Validators.required],
      country_id: ['132', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      personal_website: [''],
      dob: ['']
    })
    this.getCountries();
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
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = true;

  }
  jobPreferences() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;

  }
  // edit personal details 
  changeGender(e) {
    this.gender = e.target.value;
  }
  onDateChanged(date) {
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];

    this.mydate = date.date;
    this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']);


  }

  get f() { return this.registrationForm.controls; }
  registration() {
    this.submitted = true;
    this.registrationForm.value.talent_attachment = this.url2;
    this.registrationForm.value.gender = this.gender;
    this.registrationForm.value.talent_attachment_video = this.url3;
    this.registrationForm.value.dob = (this.selDate);
    this.registrationForm.value.mobile ? JSON.parse(this.registrationForm.value.mobile) : '';
    this.registrationForm.value.mobile_code = this.mobile_code;

    if (this.registrationForm.controls['state_id'].value == 'null') {
      this.registrationForm.patchValue({ 'state_id': null });// .reset();
    }

    if (this.registrationForm.controls['city_id'].value == 'null') {
      this.registrationForm.patchValue({ 'city_id': null });// .reset();
    }


    if (this.registrationForm.invalid) {
      return;
    }
    if ((this.registrationForm.value.talent_attachment == undefined && (this.registrationForm.value.talent_attachment_video == undefined))) {

      return false;
    }

    else {
      this.stepone_details = {
        "first_name": this.registrationForm.value.first_name,
        "last_name": this.registrationForm.value.last_name,
        "email": this.route.snapshot.queryParams.email,
        "password": this.route.snapshot.queryParams.password,
        "mobile_code": this.registrationForm.value.mobile_code,
        "mobile": this.registrationForm.value.mobile,
        "country_id": this.registrationForm.value.country_id,
        "state_id": this.registrationForm.value.state_id,
        "city_id": this.registrationForm.value.city_id,
        "location": this.registrationForm.value.location,
        "dob": this.registrationForm.value.dob,
        "talent_attachment": this.registrationForm.value.talent_attachment,
        "talent_attachment_video": this.registrationForm.value.talent_attachment_video,
        "gender": this.registrationForm.value.gender,
        "personal_website": this.registrationForm.value.personal_website,
        "twitter": this.registrationForm.value.twitter,
        "linkedin": this.registrationForm.value.linkedIn,
        "facebook": this.registrationForm.value.facebook,
        "talent_image": this.url1,
      }
      this.object1 = this.registrationForm.value;
    }
  }

  image;
  readUrl(event: any) {
    console.log('readUrl');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        console.log(this.url1)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
      this.changeCountryList(132);
    })
  }
  countryId; statesList = []; MobileCode;
  changeCountryList(id) {
    this.countryId = id;
    for (var i = 0; i < this.CountiresList.length; i++) {
      if (this.countryId == this.CountiresList[i].country_id) {
        this.mobile_code = this.CountiresList[i].mobile_code
      }
    }

    let params = {
      country_id: this.countryId,
    }
    this.appSer.statesList(params).subscribe((res) => {

      this.statesList = res['states'];
      this.registrationForm.patchValue({ 'state_id': null });// .reset();
      this.registrationForm.patchValue({ 'city_id': null });
      let params1 = {
        state_id: this.stateId,
      }
      this.appSer.citiesList(params1).subscribe((res) => {
        this.citiesList = res['cities'];
      })
    })
  }

  changeStateList(id) {
    this.stateId = id;
    let params = {
      state_id: this.stateId,
    }

    this.appSer.citiesList(params).subscribe((res) => {
      this.citiesList = res['cities'];
      this.registrationForm.patchValue({ 'city_id': null });
    })
  }
  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
      return { 'ageRange': true };
    }
    return null;
  }
  // edit personal details


  editBank;
  get f5() { return this.editBankDetailsForm.controls; };
  addBankAccount() {
    this.submitted5 = true;
    this.editBank = true;
    this.showBankDetails = true;
    this.showBankForm = true;
    this.addBankDetails = false;
    if (this.editBankDetailsForm.invalid) {
      return;
    }
    this.editBankDetailsForm.value.form_type = 'step6',
      this.editBankDetailsForm.value.talent_id = this.talentId;
    this.appSer.addBankDetails(this.editBankDetailsForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        this.editBank = false;
        this.addBankDetails = false;
      }
      else {
        this.toast.error(res['message'], "error");
        this.edit = false;
      }
    })
  }
  addBankAccountNew() {
    // this.submitted = true;
    this.editBank = true;
    this.showBankDetails = true;
    this.showBankForm = true;
    this.addBankDetails = false;
  }


  editBankDetails() {
    this.editBank = true;
  }
  // cancelBank() {
  //   if (this.talentBankDetails.length == 0) {
  //     this.addBankDetails = true;
  //     this.editBank = false;
  //     this.showBankForm = false;
  //   } else {
  //     this.showBankForm = true;
  //     this.addBankDetails = false;
  //     this.editBank = false;;


  //   }
  // }



}
