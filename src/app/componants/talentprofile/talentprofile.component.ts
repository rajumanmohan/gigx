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
  edit = false;
  showEducationDetails = false;
  showWorkExperienceDetails = false;
  showBankDetails = false;
  showGigsTrackDetails = false;
  submitted5 = false;
  editEdu = false;
  editjobpreference = false;
  showBankForm = false;
  editBankDetailsForm: FormGroup;
  registrationForm: FormGroup;
  registrationForm1: FormGroup;
  employeeForm: FormGroup;
  jobPreferrences: FormGroup;
  addBankDetails = true;
  talentId; loginType;
  submitted = false;
  submitted1 = false;
  submitted3 = false;
  isProfesionalCertification = false;
  editDetails = true;
  submitted4 = false;
  showjobPreferences = false;
  url2;
  gender = "Male";
  url3;
  selDate;
  array1 = [];
  mobile_code;
  params = {};
  url1;
  object1 = {}; object2 = {}; stepthree_details = {};
  mydate; imageUrl; cityId;
  CountiresList;
  stateId; citiesList; talentPersonalDetails: any = []; newArr = []; talentEducationDetails; talentJobDetails; talentJobPreference; talentBankDetails;
  test;
  editjob = false;
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
  array2 = [];
  highestQualificationList = [];
  obj3 = {};
  private workingSinceOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };
  private workingFromOptions: IMyDpOptions[] = [];
  private workingToOptions: IMyDpOptions[] = [];
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
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

    // work experience

    this.employeeForm = this.fb.group({
      "work_experience": ['', Validators.required],
      "current_company": ['', Validators.required],
      "salary_input": ['', Validators.required],
      "currency_type": ['', Validators.required],
      "working_since": ['', Validators.required],
      "annual_salary": [''],
      "industry_type": ['', Validators.required],
      "role": ['', Validators.required],
      "role_desc": ['', Validators.required],
      "location": ['', Validators.required],
      "job_details": new FormArray([]),

    });

    // work experience

    // job preference
    this.jobPreferrences = this.fb.group({
      "preference_location": ['', Validators.required],
      "preference_industry_type": ['', Validators.required],
      "preference_role": ['', Validators.required],
      "desired_employment_type": ['Gig'],
      "work_preferences": ['Willing to Travel', Validators.required],
      "skills": ['', Validators.required],
      "form_type": ['step4']
    });

    // job preference
    this.getCountries();
    this.getSkills();

  }
  cancel() {
    window.scroll(0, 0);
    this.edit = false;
    this.editEdu = false;



  }
  canceledu() {
    this.editEdu = false;
    this.showEducationDetails = true;
  }
  cancelexp() {
    this.showWorkExperienceDetails = false;
    this.editjob = true;
  }

  canceljobpreference() {
    this.editjobpreference = true;
    this.showjobPreferences = false;
  }

  personaldetails() {
    window.scroll(0, 0);
    this.showPersonalDetails = true;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.showjobPreferences = false;
    this.showtalentProfile();
    this.edit = false;
    this.editEdu = false;
    this.editjob = false;
    this.editjobpreference = false;
  }

  education() {
    window.scroll(0, 0);
    this.edit = false;
    this.showPersonalDetails = false;
    this.showEducationDetails = true;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.showjobPreferences = false;
    this.editEdu = false;
    this.editjob = false;
    this.editjobpreference = false;

    this.getHighestQualificationList();
    this.getInstitutionsListBasedOnCountry(this.registrationForm.value.country_id);
    this.getYearOfCompletions();
    this.object1 = this.registrationForm.value;

    this.registrationForm1.patchValue({ 'country': this.registrationForm.value.country_id });
  }

  workexperience() {
    window.scroll(0, 0);
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.showjobPreferences = false;
    this.editEdu = false;
    this.editjob = true;
    this.editjobpreference = false;

  }

  bankdetails() {
    window.scroll(0, 0);
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = true;
    this.showGigsTrackDetails = false;
    this.showjobPreferences = false;
    this.editEdu = false;
    this.editjob = false;
    this.showtalentProfile();
  }

  gigstalent() {
    window.scroll(0, 0);
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = true;
    this.showjobPreferences = false;
    this.editEdu = false;
    this.editjob = false;
    this.editjobpreference = false;

  }
  jobPreferences() {
    window.scroll(0, 0);
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.showjobPreferences = false;
    this.showtalentProfile();
    this.addBankDetails = false;
    this.getIndustryTypeList();
    this.getRoleList();
    this.editEdu = false;
    this.editjob = false;
    this.editjobpreference = true;

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
    // this.registrationForm.value.dob = (this.selDate);
    this.registrationForm.value.mobile ? JSON.parse(this.registrationForm.value.mobile) : '';
    this.registrationForm.value.mobile_code = this.mobile_code;
    this.registrationForm.value.country_id = this.countryId;
    this.registrationForm.value.state_id = this.stateId;
    this.registrationForm.value.city_id = this.cityId;
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
          this.showtalentProfile();
          this.edit = false;
        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }
  editProfile() {
    this.edit = true;
    this.registrationForm = this.fb.group({
      first_name: [this.talentPersonalDetails['first_name'], Validators.required],
      last_name: [this.talentPersonalDetails['last_name'], Validators.required],
      email: [this.talentPersonalDetails['email'], Validators.required],
      mobile: [this.talentPersonalDetails['mobile'], Validators.required],
      location: [this.talentPersonalDetails['location'], Validators.required],
      country_id: [this.talentPersonalDetails['country'], Validators.required],
      twitter: [this.talentPersonalDetails['twitter']],
      facebook: [this.talentPersonalDetails['facebook']],
      linkedIn: [this.talentPersonalDetails['linkedIn']],
      personal_website: [this.talentPersonalDetails['personal_website']],
      state_id: [this.talentPersonalDetails['state'], Validators.required],
      city_id: [this.talentPersonalDetails['city'], Validators.required],
      // temp this.talentPersonalDetails['gender']
      gender: [this.talentPersonalDetails['gender'], Validators.required],
      // 
      dob: [this.talentPersonalDetails['dob']],
      form_type: ["step1"],
      talent_id: [JSON.parse(localStorage.talent_id)],
      talent_old_attachment: [''],
      talent_attachment: [''],
      talent_old_video: [''],
      talent_attachment_video: [''],
      mobile_code: [this.talentPersonalDetails['mobile_code'], Validators.required],
    })

    // this.personalForm.controls['gender'].setValue(this.talentPersonalDetails['gender'], { onlySelf: true });
  }
  // get countries by list


  // get countries by list
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
      // this.changeCountryList(132);
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
      this.stateId = res['states'].state_id;
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
      let d: Date = new Date(this.talentPersonalDetails.dob);

      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
      this.talentEducationDetails = res['step2'].educationaldetails;
      this.talentJobDetails = res['step3'].jobdetails;
      this.talentJobPreference = res['step4'].jobpreferences[0];
      this.talentBankDetails = res['step5'].bankdetails[0] || [];
    })
  }
  onSelcetChanged(date) {
    this.selDate = date.date;
    console.log(this.selDate)
    var newDate = this.selDate['year'] + "/" + this.selDate['month'] + "/" + this.selDate['day'];
    console.log(newDate)
    // this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']);
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];
    this.registrationForm.value.dob = newDate;
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
          "other_highest_qualification": tempForm[i].controls['professional_certification'] ? tempForm[i].controls['professional_certification'].value : '',
          "university_id": tempForm[i].controls['institution'].value,
          "year_of_completion": tempForm[i].controls['year_of_completion'].value,
          "professional_qualification": tempForm[i].controls['professional_qualification'].value,
          "mode_of_study": tempForm[i].controls['degree'].value,
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
        "qualifications": this.steptwo_detailsArray,
        "form_type": 'step2',
      }

      console.log('steptwodetails')
      console.log(this.steptwo_details)

    }
  }

  showEditEdu() {
    this.editEdu = true;


    this.showEducationDetails = false;
    console.log("talent details", this.talentEducationDetails);
    for (var i = this.f2.length; i < this.talentEducationDetails.length; i++) {
      this.f2.push(this.fb.group({
        other_highest_qualification: [this.talentEducationDetails[i].highest_qualification, Validators.required],
        professional_qualification: [this.talentEducationDetails[i].professional_qualification, Validators.required],
        university_name: [this.talentEducationDetails[i].university_name, Validators.required],
        year_of_completion: [this.talentEducationDetails[i].year_of_completion, Validators.required],
        mode_of_study: [this.talentEducationDetails[i].mode_of_study, Validators.required],
        educational_id: [this.talentEducationDetails[i].educational_id]

      }));
    }

  }

  showEditJob() {
    this.editjob = false;
    this.showWorkExperienceDetails = true;
    for (var i = this.f5.length; i < this.talentJobDetails.length; i++) {
      this.f5.push(this.fb.group({
        current_designation: [this.talentJobDetails[i].current_designation, Validators.required],
        current_company: [this.talentJobDetails[i].current_company, Validators.required],
        annual_salary: [this.talentJobDetails[i].annual_salary, Validators.required],
        currency_type: [this.talentJobDetails[i].annual_salary.split(/[0-9]/)[0], Validators.required],
        currency_type1: [this.talentJobDetails[i].annual_salary.split('Laks')[0].split(/(\d+)/)[1], Validators.required],
        currency_type2: [this.talentJobDetails[i].annual_salary.split(" ")[2].split('Thousand')[0], Validators.required],
        working_period: [this.talentJobDetails[i].working_period, Validators.required],
        working_period1: [this.talentJobDetails[i].working_period.split("to")[0].split("-")[0], Validators.required],
        working_period2: [this.talentJobDetails[i].working_period.split("to")[0].split("-")[1], Validators.required],
        working_period3: [this.talentJobDetails[i].working_period.split("to")[0].split("-")[2].replace(/ +/g, ""), Validators.required],
        working_period4: [this.talentJobDetails[i].working_period.split("to")[1].split("-")[0].replace(/ +/g, ""), Validators.required],
        working_period5: [this.talentJobDetails[i].working_period.split("to")[1].split("-")[1], Validators.required],
        working_period6: [this.talentJobDetails[i].working_period.split("to")[1].split("-")[2], Validators.required],
        location: [this.talentJobDetails[i].location, Validators.required],
        industry_type: [this.talentJobDetails[i].industry_type, Validators.required],
        role: [this.talentJobDetails[i].role, Validators.required],
        jobdetails_id: [this.talentJobDetails[i].jobdetails_id]
      }));

    }
  }
  showEditPreferences() {
    this.editjobpreference = false;
    this.showjobPreferences = true;
  }
  onQualificationCountryChange(countryId) {
    this.getInstitutionsListBasedOnCountry(countryId);
  }

  onQualificationCountryChangeCustom(countryId, index) {
    this.getInstitutionsListBasedOnCountryCustom(countryId, index);
  }

  getInstitutionsListBasedOnCountryCustom(counrtyId, index) {
    //if(this.institutionsList.length == 0){ 
    let params = {
      country_id: JSON.parse(counrtyId),
    }
    this.appSer.getInstitutionsList(params).subscribe((res) => {

      this.institutionsListCustom[index] = res['universities'];
      //this.registrationForm1.patchValue({'institution': null});
      var tempForm = this.f2.controls as FormGroup[];
      tempForm[index].patchValue({ 'institution1': null });
    });
    //}
  }


  onWorkingFromDateChanged(event, index) {
    //this.mydate = event.date;
    this.workingToOptions[index] = ({
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
  }
  onWorkingToDateChanged(event, index) {
    //this.mydate = event.date;
    this.workingFromOptions[index] = ({
      dateFormat: 'dd/mm/yyyy',
      disableSince: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
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
      year_of_completion: ['', Validators.required],
      degree: ['Full time'],
      professional_qualification: [''],
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

  // edit job preference


  industryTypes = []; roles = [];
  getIndustryTypeList() {
    if (this.industryTypes.length == 0) {
      this.appSer.getIndustryTypeList().subscribe((res) => {
        this.industryTypes = res['industries'];
        this.employeeForm.patchValue({ 'industry_type': null });
      });
    }
  }
  getRoleList() {
    if (this.roles.length == 0) {
      this.appSer.getRoleList().subscribe((res) => {
        this.roles = res['roles'];
        this.employeeForm.patchValue({ 'role': null });
      });
    }
  }

  skillsList = [];
  getSkills() {
    this.appSer.getSkillList().subscribe((res) => {
      //this.skillsList = res['skills'].map(x=>x.skill_name);
      this.skillsList = res['skills'];
    });
  }

  empType;
  employeeType(event) {
    this.empType = event.target.value;
    console.log(this.empType);
  }

  get f4() { return this.jobPreferrences.controls; }

  submitJob() {
    this.jobPreferrences.value.desired_employment_type = this.empType;
    this.jobPreferrences.value.skills = this.newArr.toString();
    this.submitted4 = true;
    if (this.jobPreferrences.invalid) {
      return;
    } else {

      var tempObj = {
        "preference_location": this.jobPreferrences.controls['preference_location'].value,
        "preference_industry_id": this.jobPreferrences.controls['preference_industry_type'].value,
        "preference_role_id": this.jobPreferrences.controls['preference_role'].value,
        "preference_other_role": this.jobPreferrences.controls['role_others'] ? this.jobPreferrences.controls['role_others'].value : '',
        "desired_employment_type": this.jobPreferrences.controls['desired_employment_type'].value,
        "skills": this.jobPreferrences.controls['skills'].value.join(','),
        "work_preference": this.jobPreferrences.controls['work_preferences'].value
      };


      this.object2 = this.jobPreferrences.value;
      this.appSer.talentEditJob(this.jobPreferrences.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "success");
        } else {
          this.toast.error(res['message'], "error");

        }
      })

    }
  }
  // edit job preference
  // edit work experience
  addEmployee() {
    // this.multiEmployee.push({
    //   highQul: ''
    // })
    this.f5.push(this.fb.group({
      work_experience: ['', Validators.required],
      current_company: ['', Validators.required],
      currency_type: ['', Validators.required],
      // currency_type1: ['', Validators.required],
      // currency_type2: ['', Validators.required],
      annual_salary: [''],
      industry_type: ['', Validators.required],
      "working_from": ['', Validators.required],
      "working_to": ['', Validators.required],
      "role": ['', Validators.required],
      "role_desc": ['', Validators.required],
      "salary_input": ['', Validators.required],
      location: ['', Validators.required],
      // date: ['', Validators.required],
      // month: ['', Validators.required],
      // year: ['', Validators.required],
      // date1: ['', Validators.required],
      // month1: ['', Validators.required],
      // year1: ['', Validators.required]
    }))


    this.workingFromOptions.push({
      dateFormat: 'dd/mm/yyyy'
    });

    this.workingToOptions.push({
      dateFormat: 'dd/mm/yyyy'
    });

  }
  remove1(x) {
    this.index = x;
    this.type_id -= 1;

    this.f5.controls.splice(x, 1);

    this.submitted3 = false;
    this.f5.markAsPristine();
    this.f5.markAsUntouched();
    this.f5.updateValueAndValidity();

  }
  get f3() { return this.employeeForm.controls; }
  get f5() { return this.f3.job_details as FormArray }
  addEmployeeForm() {
    this.employeeForm.value.annual_salary = this.employeeForm.value.currency_type + "" + this.employeeForm.value.currency_type1 + "Laks " + " " + this.employeeForm.value.currency_type2 + "Thousand";
    this.employeeForm.value.working_period = this.employeeForm.value.year + "-" + this.employeeForm.value.month + "-" + this.employeeForm.value.date + " to" + 'present';
    delete this.employeeForm.value.currency_type;
    delete this.employeeForm.value.currency_type1;
    delete this.employeeForm.value.currency_type2;
    this.employeeForm.value.desired_employment_type = this.empType;
    for (var i = 0; i < this.employeeForm.value.job_details.length; i++) {
      this.employeeForm.value.job_details[i].annual_salary = this.employeeForm.value.job_details[i].currency_type + "" + this.employeeForm.value.job_details[i].currency_type1 + "Laks " + " " + this.employeeForm.value.job_details[i].currency_type2 + "Thousand";
      delete this.employeeForm.value.job_details[i].currency_type;
      delete this.employeeForm.value.job_details[i].currency_type1;
      delete this.employeeForm.value.job_details[i].currency_type2;
      this.employeeForm.value.job_details[i].working_period = this.employeeForm.value.job_details[i].date + "-" + this.employeeForm.value.job_details[i].month + "- " + this.employeeForm.value.job_details[i].year + "to" + this.employeeForm.value.job_details[i].date1 + "-" + this.employeeForm.value.job_details[i].month1 + "- " + this.employeeForm.value.job_details[i].year1;
      delete this.employeeForm.value.job_details[i].date;
      delete this.employeeForm.value.job_details[i].month;
      delete this.employeeForm.value.job_details[i].year;
      delete this.employeeForm.value.job_details[i].date1;
      delete this.employeeForm.value.job_details[i].month1;
      delete this.employeeForm.value.job_details[i].year1;
    }

    this.obj3["current_designation"] = this.employeeForm.value.current_designation;
    this.obj3["current_company"] = this.employeeForm.value.current_company;
    this.obj3["annual_salary"] = this.employeeForm.value.annual_salary;
    this.obj3["working_period"] = this.employeeForm.value.working_period;
    this.obj3["location"] = this.employeeForm.value.location;
    this.obj3["industry_type"] = this.employeeForm.value.industry_type;
    this.obj3["role"] = this.employeeForm.value.role;

    // this.employeeForm.value.skills = this.newArr;
    this.submitted3 = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      var tempObj = {
        "work_experience": "",
        "company": "",
        "salary": "",
        "working_period": "",
        "location": "",
        "industry_id": "",
        "role_id": "",
        "role_description": ""
      }

      var tempEmployeeArray = [];

      var selectedWorkingSinceDate = this.employeeForm.controls['working_since'].value.date;
      tempObj.work_experience = this.employeeForm.controls['work_experience'].value;
      tempObj.company = this.employeeForm.controls['current_company'].value
      tempObj.salary = `${this.employeeForm.controls['currency_type'].value} ${this.employeeForm.controls['salary_input'].value}`;
      tempObj.working_period = `${selectedWorkingSinceDate.year}-${selectedWorkingSinceDate.month}-${selectedWorkingSinceDate.day} to present`;
      tempObj.location = this.employeeForm.controls['location'].value;
      tempObj.industry_id = this.employeeForm.controls['industry_type'].value;
      tempObj.role_id = this.employeeForm.controls['role'].value;
      tempObj.role_description = this.employeeForm.controls['role_desc'].value;

      tempEmployeeArray.push(tempObj);


      var tempFormGroupArray = this.employeeForm.controls['job_details'] as FormArray;
      for (var i = 0; i < tempFormGroupArray.length; i++) {
        var tempFormGroup = tempFormGroupArray.controls[i] as FormGroup;
        var internalObj = {
          "work_experience": "",
          "company": "",
          "salary": "",
          "working_period": "",
          "location": "",
          "industry_id": "",
          "role_id": "",
          "role_description": ""
        };

        var selectedWorkingFromDate = tempFormGroup.controls['working_from'].value.date;
        var selectedWorkingToDate = tempFormGroup.controls['working_to'].value.date;
        internalObj.work_experience = tempFormGroup.controls['work_experience'].value;
        internalObj.company = tempFormGroup.controls['current_company'].value;
        internalObj.salary = `${tempFormGroup.controls['currency_type'].value} ${tempFormGroup.controls['salary_input'].value}`;
        internalObj.working_period = `${selectedWorkingFromDate.year}-${selectedWorkingFromDate.month}-${selectedWorkingFromDate.day} to ${selectedWorkingToDate.year}-${selectedWorkingToDate.month}-${selectedWorkingToDate.day}`;
        internalObj.location = tempFormGroup.controls['location'].value;
        internalObj.industry_id = tempFormGroup.controls['industry_type'].value;
        internalObj.role_id = tempFormGroup.controls['role'].value;
        internalObj.role_description = tempFormGroup.controls['role_desc'].value;
        tempEmployeeArray.push(internalObj);
      }



      this.stepthree_details = {
        "job_details": tempEmployeeArray
      }
      console.log('stepthree_details');
      console.log(this.stepthree_details);
      this.employeeForm.value.job_details.unshift(this.obj3);
      console.log("step 3", this.employeeForm.value)
      this.array2 = this.employeeForm.value.job_details;

      if (this.jobPreferrences.controls['preference_industry_type'].value == 'null'
        || !this.jobPreferrences.controls['preference_industry_type'].value) {
        this.jobPreferrences.patchValue({ 'preference_industry_type': null });
      }

      if (this.jobPreferrences.controls['preference_role'].value == 'null'
        || !this.jobPreferrences.controls['preference_role'].value) {
        this.jobPreferrences.patchValue({ 'preference_role': null });
      }
    }
  }


  // edit work experience
  editBank;
  get f6() { return this.editBankDetailsForm.controls; };
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
  cancelBank() {
    if (this.talentBankDetails.length == 0) {
      this.addBankDetails = true;
      this.editBank = false;
      this.showBankForm = false;
    } else {
      this.showBankForm = true;
      this.addBankDetails = false;
      this.editBank = false;;


    }
  }


  onHighestQualificationChange(event: any) {
    if (event.currentTarget.value == '4') {

      this.isProfesionalCertification = true;
      this.registrationForm1.addControl('professional_certification', new FormControl('', Validators.required));
    }
    else {
      this.isProfesionalCertification = false;
      this.registrationForm1.removeControl('professional_certification');
    }
  }

  currentIndex = 0;
  onHighestQualificationChangeOther(event: any, index, ngForm) {
    if (event.currentTarget.value == '4') {
      ngForm.addControl('professional_certification1', new FormControl('', Validators.required));
    }
    else {
      ngForm.removeControl('professional_certification1');
    }
    this.currentIndex = index + 1;
  }

  isOtherRoleSelected = false;
  onJobPreferenceRoleChange(event: any) {
    if (event.currentTarget.value == '8') {
      this.isOtherRoleSelected = true;
      this.jobPreferrences.addControl('role_others', new FormControl('', Validators.required));
    }
    else {
      this.isOtherRoleSelected = false;
      this.jobPreferrences.removeControl('role_others');
    }
  }

}
