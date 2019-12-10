import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
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
  edit = false; talentId; loginType;
  personalForm: FormGroup;
  educationForm: FormGroup;
  jobForm: FormGroup;
  submitted = false;
  preferenceForm: FormGroup;
  mydate;
  selDate;
  genderItems = ["Male", "Female", "Not to Disclose"];
  editEdu = false;
  degreeArray = ["Full time", "Part time", "Correspandence"];
  currencyType = ["INR", "$", "RM"];
  currencyType1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currencyType2 = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  dateArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  yearArray = ["present", 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
  industryArr = ["Oil and Gas", "IT", "Marketing"];
  roleArr = ["Associate Manager", "Senior Architect", "Marketing Manager", "individual"];
  employmentArr = ["Gig", "Contract", "Full time"]
  editJob = false;
  showjobPreferences = false;
  url1;
  editPreferences = false;
  submitted1 = false;
  newArr = [];
  editBankDetailsForm: FormGroup;
  imgBaseUrl = "https://gigxglobal.com/talent_images/";
  path;
  url2;
  url3;
  addBankDetails;
  editBank = false;
  email;
  password;
  CountiresList;
  showBankForm = false;
  submitted5 = false;
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
  // form_type,talent_id,full_name,email,,mobile_code,mobile,location,talent_old_attachment,talent_attachment,talent_old_video,talent_attachment_video,gender,dob

  ngOnInit() {
    window.scroll(0, 0);
    this.personalForm = this.fb.group({
      full_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      location: ['', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [''],
      form_type: ["step1"],
      talent_id: [JSON.parse(localStorage.talent_id)],
      talent_old_attachment: [''],
      talent_attachment: [''],
      talent_old_video: [''],
      talent_attachment_video: [''],
      mobile_code: [''],
    })
    this.educationForm = this.fb.group({
      qualifications: new FormArray([]),
      form_type: [''],
      talent_id: ['']
    })
    this.jobForm = this.fb.group({
      job_details: new FormArray([]),
      form_type: ['step3'],
      talent_id: ['']
    });
    this.preferenceForm = this.fb.group({
      location: ['', Validators.required],
      industry_name: ['', Validators.required],

    })
    console.log(this.educationForm.value.other)
    this.showtalentProfile();
    this.editBankDetailsForm = this.fb.group({
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      location: ['', Validators.required]
    })
    this.getCountries();
  }

  personaldetails() {
    this.showPersonalDetails = true;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = false;
    this.addBankDetails = false;
  }

  education() {
    this.showPersonalDetails = false;
    this.showEducationDetails = true;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = false;
    this.showjobPreferences = false;
    this.addBankDetails = false;

  }

  workexperience() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = true;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = false;
    this.addBankDetails = false;

  }

  bankdetails() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = true;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = false;
  }

  gigstalent() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = true;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = false;
    this.addBankDetails = false;

  }
  jobPreferences() {
    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    this.showjobPreferences = true;
    this.showtalentProfile();
    this.addBankDetails = false;

  }
  showEditPreferences() {
    this.newArr = [];
    // form_type,talent_id,preference_location,preference_industry_type,preference_role,desired_employment_type,skills

    this.showPersonalDetails = false;
    this.showEducationDetails = false;
    this.showWorkExperienceDetails = false;
    this.showBankDetails = false;
    this.showGigsTrackDetails = false;
    this.edit = false;
    this.editEdu = false;
    this.editJob = false;
    // this.showjobPreferences = false;
    this.editPreferences = true;
    this.preferenceForm = this.fb.group({
      location: [this.talentJobPreference.location, Validators.required],
      industry_name: [this.talentJobPreference.industry_type, Validators.required],
      role: [this.talentJobPreference.role, Validators.required],
      employment_type: [this.talentJobPreference.employment_type, Validators.required],
      work_preferences: [this.talentJobPreference.work_preferences, Validators.required],
      skills: [this.talentJobPreference.skills],
      form_type: ['step4'],
      talent_id: [JSON.parse(localStorage.talent_id)],
      talent_old_image: [],
      talent_image: []
    })
    // var newSkills = this.preferenceForm.value.skills;
    console.log(this.preferenceForm.value.skills)
    var arr = [];
    arr.push(this.preferenceForm.value.skills)
    // var skillsArr = arr.split(",");
    // console.log(skillsArr)

    this.newArr = arr;
    // for (var i = 0; i < newSkills.length; i++) {
    //   console.log(newSkills[i])
    //   this.newArr.push(newSkills[i]);

    // }
    // this.add(newSkills);


  }
  get f4() { return this.preferenceForm.controls }
  savePreferences() {
    this.submitted1 = true;
    this.preferenceForm.value.skills = this.newArr.toString();

    if (this.preferenceForm.invalid) {
      return;
    } else {
      this.appSer.talentEditJob(this.preferenceForm.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.showjobPreferences = true;
          this.editPreferences = false;
          this.showtalentProfile();
          // this.url1 = "";

        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
    // this.url1 = "";

  }
  cancelPreferences() {
    this.editPreferences = false;
    this.showjobPreferences = true;
  }
  editProfile() {
    this.edit = true;
    this.personalForm = this.fb.group({
      first_name: [this.talentPersonalDetails['first_name'], Validators.required],
      last_name: [this.talentPersonalDetails['last_name'], Validators.required],
      email: [this.talentPersonalDetails['email'], Validators.required],
      mobile: [this.talentPersonalDetails['mobile'], Validators.required],
      location: [this.talentPersonalDetails['location'], Validators.required],
      country_id: [this.talentPersonalDetails['country'], Validators.required],
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
      mobile_code: [''],
    })

    // this.personalForm.controls['gender'].setValue(this.talentPersonalDetails['gender'], { onlySelf: true });
  }
  get f() { return this.personalForm.controls }
  saveProfile() {
    if (this.url2) {
      this.personalForm.value.talent_attachment = this.talentPersonalDetails.attachment;
      this.personalForm.value.talent_old_attachment = this.url2;
    } else {
      this.personalForm.value.talent_attachment = this.talentPersonalDetails.attachment;
      this.personalForm.value.talent_old_attachment = "";
    }
    if (this.url3) {
      this.personalForm.value.talent_old_video = this.talentPersonalDetails.attachment;
      this.personalForm.value.talent_attachment_video = this.url3;
    } else {
      this.personalForm.value.talent_old_video = this.talentPersonalDetails.attachment;
      this.personalForm.value.talent_attachment_video = "";
    }
    if (this.url1) {
      this.personalForm.value.talent_old_image = this.talentPersonalDetails.image;
      this.personalForm.value.talent_image = this.url1;
    } else {
      this.personalForm.value.talent_old_image = this.talentPersonalDetails.image;
      this.personalForm.value.talent_image = "";
    }
    this.personalForm.value.country_id = this.countryId;
    this.personalForm.value.state_id = this.stateId;
    this.personalForm.value.city_id = this.cityId;
    // this.personalForm.value.dob = this.selDate;
    console.log(this.personalForm.value);
    this.submitted = true;
    if (this.personalForm.invalid) {
      return;
    } else {
      this.appSer.talentEditEducation(this.personalForm.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.showPersonalDetails = true;
          this.edit = false;
          this.showtalentProfile();
        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }

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
  showEditEdu() {
    this.editEdu = true;


    this.showEducationDetails = false;
    for (var i = this.t.length; i < this.talentEducationDetails.length; i++) {
      this.t.push(this.fb.group({
        high_qualification: [this.talentEducationDetails[i].highest_qualification, Validators.required],
        professional_qualification: [this.talentEducationDetails[i].professional_qualification, Validators.required],
        university_name: [this.talentEducationDetails[i].university_name, Validators.required],
        year_of_completion: [this.talentEducationDetails[i].year_of_completion, Validators.required],
        mode_of_study: [this.talentEducationDetails[i].mode_of_study, Validators.required],
        educational_id: [this.talentEducationDetails[i].educational_id]
      }));
    }

  }
  cancelJob() {
    this.editJob = false;
    this.showWorkExperienceDetails = true;
  }
  showEditJob() {
    this.editJob = true;
    this.showWorkExperienceDetails = false;

    for (var i = this.t1.length; i < this.talentJobDetails.length; i++) {
      this.t1.push(this.fb.group({
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
  get f2() { return this.jobForm.controls; }
  get t1() { return this.f2.job_details as FormArray; }
  editJobData() {
    for (var i = 0; i < this.jobForm.value.job_details.length; i++) {
      this.jobForm.value.job_details[i].annual_salary = this.jobForm.value.job_details[i].currency_type + "" + this.jobForm.value.job_details[i].currency_type1 + "Laks " + " " + this.jobForm.value.job_details[i].currency_type2 + "Thousand";
      delete this.jobForm.value.job_details[i].currency_type;
      delete this.jobForm.value.job_details[i].currency_type1;
      delete this.jobForm.value.job_details[i].currency_type2;
      this.jobForm.value.job_details[i].working_period = this.jobForm.value.job_details[i].working_period1 + "-" + this.jobForm.value.job_details[i].working_period2 + "-" + this.jobForm.value.job_details[i].working_period3 + " to " + this.jobForm.value.job_details[i].working_period4 + "-" + this.jobForm.value.job_details[i].working_period5 + "-" + this.jobForm.value.job_details[i].working_period6;
      delete this.jobForm.value.job_details[i].working_period1;
      delete this.jobForm.value.job_details[i].working_period2;
      delete this.jobForm.value.job_details[i].working_period3;
      delete this.jobForm.value.job_details[i].working_period4;
      delete this.jobForm.value.job_details[i].working_period5;
      delete this.jobForm.value.job_details[i].working_period6;
    }
    this.jobForm.value.talent_id = JSON.parse(localStorage.talent_id);
    this.submitted = true;
    if (this.jobForm.invalid) {
      return;
    } else {
      this.appSer.talentEditJob(this.jobForm.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.showWorkExperienceDetails = true;
          this.editJob = false;
          this.showtalentProfile();
        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }
  get f1() { return this.educationForm.controls; }
  get t() { return this.f1.qualifications as FormArray; }
  editEducation() {
    this.educationForm.value.form_type = "step2";
    this.educationForm.value.talent_id = JSON.parse(localStorage.talent_id);
    this.submitted = true;
    if (this.educationForm.invalid) {
      return;
    } else {
      this.appSer.talentEditEducation(this.educationForm.value).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.showEducationDetails = true;
          this.editEdu = false;
          this.showtalentProfile();
        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }

  showData() {
    this.edit = false;
  }
  cancelEdu() {
    this.editEdu = false;
    this.showEducationDetails = true;
  }

  talentPersonalDetails: any = []; talentEducationDetails; talentJobDetails; talentJobPreference; talentBankDetails;
  showtalentProfile() {
    let params = {
      talent_id: this.talentId
    }

    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      this.countryId = this.talentPersonalDetails['country_id'];
      this.stateId = this.talentPersonalDetails['state_id'];
      this.cityId = this.talentPersonalDetails['city_id'];
      console.log(this.countryId)
      console.log(this.stateId)
      this.getStates();
      this.getCities();
      // this.talentPersonalDetails.dob
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
      if (this.talentBankDetails.length == 0) {
        this.addBankDetails = true;
        this.showBankForm = false;
      } else {
        this.addBankDetails = false;
        this.showBankForm = true;
      }
      this.editBankDetailsForm = this.fb.group({
        account_holder_name: [this.talentBankDetails.account_holder_name, Validators.required],
        account_number: [this.talentBankDetails.account_number, Validators.required],
        bank_name: [this.talentBankDetails.bank_name, Validators.required],
        ifsc: [this.talentBankDetails.ifsc, Validators.required],
        branch: [this.talentBankDetails.branch, Validators.required],
        location: [this.talentBankDetails.location, Validators.required],

      })
    })

  }


  onDateChanged(date) {
    this.selDate = date.date;
    console.log(this.selDate)
    var newDate = this.selDate['year'] + "/" + this.selDate['month'] + "/" + this.selDate['day'];
    console.log(newDate)
    // this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']);
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];
    this.personalForm.value.dob = newDate;
  }
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
        this.showtalentProfile();
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
  add(text) {

    if (this.newArr.indexOf(text) === -1) {
      this.newArr.push(text);
      console.log(this.newArr);
    }
  }
  closeSkill(skill) {
    this.newArr.splice(skill, 1);
  }
  cancel() {
    this.edit = false;
  }
  multiEducation() {
    // for (var i = this.t.length; i < this.talentEducationDetails.length; i++) {
    this.t.push(this.fb.group({
      high_qualification: [, Validators.required],
      professional_qualification: [, Validators.required],
      university_name: [, Validators.required],
      year_of_completion: [, Validators.required],
      mode_of_study: [, Validators.required],
      educational_id: []
    }));
    // }
  }


  addEmployment() {
    this.t1.push(this.fb.group({
      current_designation: ['', Validators.required],
      current_company: ['', Validators.required],
      currency_type: ['', Validators.required],
      currency_type1: ['', Validators.required],
      currency_type2: ['', Validators.required],
      working_period1: ['', Validators.required],
      working_period2: ['', Validators.required],
      working_period3: ['', Validators.required],
      working_period4: ['', Validators.required],
      working_period5: ['', Validators.required],
      working_period6: ['', Validators.required],
      location: ['', Validators.required],
      industry_type: ['', Validators.required],
      role: ['', Validators.required],
      jobdetails_id: ['']
    }));
  }
  index;
  remove(x, eid) {

    if (eid == "" || null) {
      this.t.controls.splice(x, 1);

      this.submitted = false;
      this.t.markAsPristine();
      this.t.markAsUntouched();
      this.t.updateValueAndValidity();

    } else {
      let params = {
        educational_id: JSON.parse(eid),
        talent_id: JSON.parse(localStorage.talent_id)
      }
      this.appSer.deleteEducation(params).subscribe(res => {
        if (res['status'] == 200) {
          this.t.controls.splice(x, 1);
          this.submitted = false;
          this.t.markAsPristine();
          this.t.markAsUntouched();
          this.t.updateValueAndValidity();
        } else {
          this.toast.error(res['message'], "error");
        }
      })
    }
  }
  removeExp(x, jobId) {
    if (jobId == "" || null) {
      this.t1.controls.splice(x, 1);
      this.submitted = false;
      this.t1.markAsPristine();
      this.t1.markAsUntouched();
      this.t1.updateValueAndValidity();

    } else {
      let params = {
        jobdetails_id: JSON.parse(jobId),
        talent_id: JSON.parse(localStorage.talent_id)
      }
      this.appSer.deleteExperiance(params).subscribe(res => {
        if (res['status'] == 200) {
          this.t1.controls.splice(x, 1);
          this.submitted = false;
          this.t1.markAsPristine();
          this.t1.markAsUntouched();
          this.t1.updateValueAndValidity();
        } else {
          this.toast.error(res['message'], "error");
        }
      })
    }
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
  countryNameId; stateNameId;
  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
    });

  }
  countryId; statesList;
  changeCountryList(name) {
    for (var i = 0; i < this.CountiresList.length; i++) {
      if (name == this.CountiresList[i].country_name) {
        this.countryId = this.CountiresList[i].country_id;
      }
    }
    let params = {
      country_id: this.countryId,
    }
    this.appSer.statesList(params).subscribe((res) => {
      this.statesList = res['states'];
      this.stateId = res['states'].state_id;
      let params1 = {
        state_id: this.stateId,
      }
      this.appSer.citiesList(params1).subscribe((res) => {
        this.citiesList = res['cities'];
      })
    })
  }

  stateId; citiesList; cityId;
  changeStateList(state) {
    for (var i = 0; i < this.statesList.length; i++) {
      if (state == this.statesList[i].state) {
        this.stateId = this.statesList[i].state_id;
      }
    }
    let params = {
      state_id: this.stateId,
    }
    this.appSer.citiesList(params).subscribe((res) => {
      this.citiesList = res['cities'];
    })
  }
  changeCityList(state) {
    for (var i = 0; i < this.citiesList.length; i++) {
      if (state == this.citiesList[i].city) {
        this.cityId = this.citiesList[i].city_id;
      }
    }
  }
  getStates() {
    let params = {
      country_id: this.countryId,
    }
    this.appSer.statesList(params).subscribe((res) => {
      this.statesList = res['states'];
    })
  }
  getCities() {
    let params = {
      state_id: this.stateId,
    }
    this.appSer.citiesList(params).subscribe((res) => {
      this.citiesList = res['cities'];
      for (var i = 0; i < this.citiesList.length; i++) {
        this.cityId = this.citiesList[i].city_id;
      }
    })
  }
}
