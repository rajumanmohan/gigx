import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  personalForm: FormGroup;
  educationForm: FormGroup;
  jobForm: FormGroup;
  submitted = false;
  preferenceForm: FormGroup;
  mydate;
  selDate;
  genderItems = ["Male", "Female", "Other"];
  editEdu = false;
  degreeArray = ["Full time", "Part time", "Correspandence"];
  currencyType = ["INR", "$", "RM"];
  currencyType1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currencyType2 = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  dateArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12];

  yearArray = ["present", 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
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
  constructor(private route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService, private fb: FormBuilder) {

    this.talentId = localStorage.getItem('talent_id');
    this.loginType = localStorage.getItem('industry_type');
  }

  ngOnInit() {
    this.personalForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['']
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
      industry_type: ['', Validators.required],

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
      preference_location: [this.talentJobPreference.location, Validators.required],
      preference_industry_type: [this.talentJobPreference.industry_type, Validators.required],
      preference_role: [this.talentJobPreference.role, Validators.required],
      desired_employment_type: [this.talentJobPreference.employment_type, Validators.required],
      skills: [this.talentJobPreference.skills],
      form_type: ['step4'],
      talent_id: [JSON.parse(localStorage.talent_id)]
    })
    var newSkills = this.preferenceForm.value.skills;
    this.newArr = this.preferenceForm.value.skills;
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
          this.add('');

        } else {
          this.toast.error(res['message'], "error");

        }
      })
    }
  }
  cancelPreferences() {
    this.editPreferences = false;
    this.showjobPreferences = true;
  }
  editProfile() {
    this.edit = true;

    this.personalForm = this.fb.group({
      full_name: [this.talentPersonalDetails['full_name'], Validators.required],
      email: [this.talentPersonalDetails['email'], Validators.required],
      mobile: [this.talentPersonalDetails['mobile'], Validators.required],
      location: [this.talentPersonalDetails['location'], Validators.required],
      // temp this.talentPersonalDetails['gender']
      gender: [this.talentPersonalDetails['gender'], Validators.required],
      dob: [this.talentPersonalDetails['dob']],
      other: this.fb.array([this.talentEducationDetails])

    })
    this.mydate = new Date(this.personalForm.value.dob);
    console.log(this.mydate);

    this.selDate = (this.mydate.getFullYear()) + "-" + (this.mydate.getMonth() + 1) + "-" + (this.mydate.getDate());
    console.log(this.selDate);
    // this.personalForm.controls['gender'].setValue(this.talentPersonalDetails['gender'], { onlySelf: true });
  }
  showEditEdu() {
    this.editEdu = true;


    this.showEducationDetails = false;
    for (var i = this.t.length; i < this.talentEducationDetails.length; i++) {
      this.t.push(this.fb.group({
        high_qualification: [this.talentEducationDetails[i].highest_qualification, Validators.required],
        specialization: [this.talentEducationDetails[i].specialization, Validators.required],
        institution: [this.talentEducationDetails[i].institution, Validators.required],
        year_of_completion: [this.talentEducationDetails[i].year_of_completion, Validators.required],
        degree: [this.talentEducationDetails[i].type_of_qualification, Validators.required],
        educational_id: [this.talentEducationDetails[i].educational_id]
      }));
    }
    console.log(this.educationForm.value)
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

  talentPersonalDetails = []; talentEducationDetails; talentJobDetails; talentJobPreference; talentBankDetails;
  showtalentProfile() {
    let params = {
      talent_id: this.talentId
    }
    this.appSer.TalentProfile(params).subscribe((res) => {
      this.talentPersonalDetails = res['step1'];
      console.log(this.talentPersonalDetails)
      this.talentEducationDetails = res['step2'].educationaldetails;
      this.talentJobDetails = res['step3'].jobdetails;
      this.talentJobPreference = res['step4'].jobpreferences[0];
      this.talentBankDetails = res['step5'].bankdetails[0] || [];
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
  get f() { return this.personalForm.controls }
  saveProfile() {
    this.submitted = true;
    if (this.personalForm.invalid) {
      return;
    }
  }

  onDateChanged(date) {
    this.mydate = date.date;
    this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']);
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];
  }
  get f5() { return this.editBankDetailsForm.controls; };
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
}
