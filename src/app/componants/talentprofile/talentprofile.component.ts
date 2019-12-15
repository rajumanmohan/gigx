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
  registrationForm1: FormGroup;
  addBankDetails = true;
  talentId; loginType;
  edit = true;
  submitted = false;
  submitted1 = false;
  url2;
  gender = "Male";
  url3;
  selDate;
  array1 = [];
  mobile_code;
  params = {};
  url1;
  object1 = {};
  mydate; imageUrl; cityId;
  CountiresList;
  stateId; citiesList; talentPersonalDetails: any = []; newArr = [];
  test;
  Data = [];
  multiEducation = [];
  degree = "Full time";
  degree1 = "Full time";
  institutionsList = [];
  nestedForm;
  institutionsListCustom = []; obj2 = {};
  steptwo_detailsArray = [];
  steptwo_details = {};
  type_id = 1;
  highestQualificationList = [];
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
    this.showtalentProfile();
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
      dob: [''],
      form_type: ["step1"],
      talent_id: [JSON.parse(localStorage.talent_id)],
      talent_old_attachment: [''],
      talent_attachment: [''],
      talent_old_video: [''],
      talent_attachment_video: [''],
    })
    // education details
    this.registrationForm1 = this.fb.group({
      highQul: ['', Validators.required],
      qualifications: new FormArray([]),
      institution: ['', Validators.required],
      year_of_completion: ['', Validators.required],
      professional_qualification: [''],
      degree: [''],
      country: ['', Validators.required]
    });

    // education details
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
    this.getHighestQualificationList();
    this.getInstitutionsListBasedOnCountry(this.registrationForm.value.country_id);
    this.getYearOfCompletions();
    this.object1 = this.registrationForm.value;

    this.registrationForm1.patchValue({ 'country': this.registrationForm.value.country_id });
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

    if (this.url2) {
      this.registrationForm.value.talent_attachment = this.talentPersonalDetails.attachment;
      this.registrationForm.value.talent_old_attachment = this.url2;
    } else {
      this.registrationForm.value.talent_attachment = this.talentPersonalDetails.attachment;
      this.registrationForm.value.talent_old_attachment = "";
    }
    if (this.url3) {
      this.registrationForm.value.talent_old_video = this.talentPersonalDetails.video;
      this.registrationForm.value.talent_attachment_video = this.url3;
    } else {
      this.registrationForm.value.talent_old_video = this.talentPersonalDetails.video;
      this.registrationForm.value.talent_attachment_video = "";
    }
    if (this.strImage) {
      this.registrationForm.value.talent_old_image = this.talentPersonalDetails.image;
      this.registrationForm.value.talent_image = this.strImage;
    } else {
      this.registrationForm.value.talent_old_image = this.talentPersonalDetails.image;
      this.registrationForm.value.talent_image = "";
    }

    if (this.registrationForm.invalid) {
      return;
    }

    else {

      this.appSer.talentEditJob(this.registrationForm.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "success");
        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }

  // image upload
  strImage: any;
  image;
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.strImage = this.image.split(',')[1];
    }
    myReader.readAsDataURL(file);
  }
  path;
  readUrl1(event: any) {
    console.log('readUrl');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.path = (event.target.files[0].name)

      reader.onload = (event: any) => {
        this.url2 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  path1;
  readUrl2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.path1 = (event.target.files[0].name)

      reader.onload = (event: any) => {
        this.url3 = event.target.result;
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

  showtalentProfile() {
    let params = {
      talent_id: this.talentId
    }

    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      this.imageUrl = res['step1'].image_url;
      this.countryId = this.talentPersonalDetails['country_id'];
      this.stateId = this.talentPersonalDetails['state_id'];
      this.cityId = this.talentPersonalDetails['city_id'];
    })
  }
  // edit personal details
  get f1() { return this.registrationForm1.controls; }
  get f2() { return this.f1.qualifications as FormArray }
  registration1(form) {
    this.nestedForm = form;
    this.registrationForm1.value.degree = this.degree;
    for (var i = 0; i < this.registrationForm1.value.qualifications.length; i++) {
      if (this.registrationForm1.value.qualifications[i].degree == "") {
        this.registrationForm1.value.qualifications[i].degree = "Full time";
      }
    }

    if (this.registrationForm1.controls['highQul'].value == 'null')
      this.registrationForm1.patchValue({ 'highQul': null });

    if (this.registrationForm1.controls['institution'].value == 'null')
      this.registrationForm1.patchValue({ 'institution': null });


    for (var i = 0; i < this.f2.controls.length; i++) {
      var tempForm = this.f2.controls as FormGroup[];
      if (tempForm[i].controls['high_qualification'].value == 'null')
        tempForm[i].patchValue({ 'high_qualification': null });

      if (tempForm[i].controls['institution1'].value == 'null')
        tempForm[i].patchValue({ 'institution1': null });
    }

    this.obj2["hq_id"] = this.registrationForm1.value.highQul;
    this.obj2["university_id"] = this.registrationForm1.value.institution
    this.obj2["year_of_completion"] = this.registrationForm1.value.year_of_completion;
    this.obj2["professional_qualification"] = this.registrationForm1.value.professional_qualification;
    this.obj2["other_highest_qualification"] = "";

    // this.registrationForm1.value.qualifications.unshift(this.obj2);//temp

    this.submitted1 = true;
    console.log("f2 values", this.f1.qualifications.invalid);
    if (this.registrationForm1.invalid) {
      return;
    } else {

      this.steptwo_detailsArray = [];
      for (var i = 0; i < this.f2.controls.length; i++) {
        var tempForm = this.f2.controls as FormGroup[];
        var qualifications = {
          "hq_id": tempForm[i].controls['high_qualification'].value,
          "other_highest_qualification": tempForm[i].controls['professional_certification1'] ? tempForm[i].controls['professional_certification1'].value : '',
          "university_id": tempForm[i].controls['institution1'].value,
          "year_of_completion": tempForm[i].controls['year_of_completion1'].value,
          "professional_qualification": tempForm[i].controls['professional_qualification1'].value,
          "mode_of_study": tempForm[i].controls['degree1'].value,
          "country_id": tempForm[i].controls['country'].value,
        }
        this.steptwo_detailsArray.push(qualifications);
      }
      var qualifications1 = {
        "hq_id": this.registrationForm1.value.highQul,
        "other_highest_qualification": this.registrationForm1.controls['professional_certification'] ? this.registrationForm1.controls['professional_certification'].value : '',
        "university_id": this.registrationForm1.value.institution,
        "year_of_completion": this.registrationForm1.value.year_of_completion,
        "professional_qualification": this.registrationForm1.value.professional_qualification,
        "mode_of_study": this.registrationForm1.value.degree,
        "country_id": this.registrationForm1.value.country,
      }
      this.steptwo_detailsArray.push(qualifications1);

      this.registrationForm1.value.qualifications.unshift(this.obj2);
      this.params = this.registrationForm.value;
      this.params['qualifications'] = this.registrationForm1.value.qualifications;

      this.array1 = this.registrationForm1.value.qualifications;
      console.log("step 2", this.registrationForm1.value);
      this.steptwo_details = {
        "qualifications": this.steptwo_detailsArray
      }

      console.log('steptwodetails')
      console.log(this.steptwo_details)

    }
  }
  // edit education details
  getData() {
    // for (var i = 0; i < this.newArr.length; i++) {
    this.Data = this.newArr;
    // }
  }
  add(text) {
    if (this.newArr.indexOf(text) === -1) {
      this.newArr.push(text);
      console.log(this.newArr);
    }
  }
  addEducation() {
    this.multiEducation.push({
      highQul: ''
    })
    // for (let i = 0; i < 1; i++) {
    this.f2.push(this.fb.group({
      high_qualification: ['', Validators.required],
      institution1: ['', Validators.required],
      year_of_completion1: ['', Validators.required],
      degree1: ['Full time'],
      professional_qualification1: [''],
      country: ['', Validators.required]
    }));
    this.type_id += 1;

    this.institutionsListCustom.push([]);
  }
  index;
  readOnlyProperty;
  remove(x) {
    this.index = x;
    this.type_id -= 1;
    for (var i = 0; i < this.f2.controls.length; i++) {
      if (x == this.index) {
        // touched
        (this.f2.controls[i].status as string) = "VALID";
        // (this.registrationForm1.invalid as any) = false;

      }
    }
    this.f2.controls.splice(x, 1);

    this.institutionsListCustom.splice(x, 1);

    this.submitted1 = false;
    this.f2.markAsPristine();
    this.f2.markAsUntouched();
    this.f2.updateValueAndValidity();

  }

  closeSkill(skill) {
    this.newArr.splice(skill, 1);
  }
  getHighestQualificationList() {
    if (this.highestQualificationList.length == 0) {
      this.appSer.getHighestQualicationList().subscribe((res) => {
        this.highestQualificationList = res['highestQualifications'];
        this.registrationForm1.patchValue({ 'highQul': null });
      });
    }
  }
  getInstitutionsListBasedOnCountry(counrtyId) {
    //if(this.institutionsList.length == 0){ 
    let params = {
      country_id: JSON.parse(counrtyId),
    }
    this.appSer.getInstitutionsList(params).subscribe((res) => {

      this.institutionsList = res['universities'];
      this.registrationForm1.patchValue({ 'institution': null });
    });
    //}
  }

  yearOfCompletionList = [];
  getYearOfCompletions() {
    for (var i = 1950; i <= (new Date()).getFullYear(); i++) {
      this.yearOfCompletionList.push(i);
    }
    this.registrationForm1.patchValue({ 'year_of_completion': null });

  }

  // edit education details
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
