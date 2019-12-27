import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import { IMyDpOptions } from 'mydatepicker';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-postagig',
  templateUrl: './postagig.component.html',
  styleUrls: ['./postagig.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class PostagigComponent implements OnInit {
  postGigForm: FormGroup;
  mileStoneForm: FormGroup;
  submitted = false;
  projectStartDateOptions: any;
  projectEndDateOptions: any;
  MLStartDateOptions: any;
  MLEndDateOptions: any;
  skillsList = [];
  submitted_MS = false;
  projectMileStones = [];
  isMileStoneInfoValid = false;

  MileStoneStamp;
  public value: Date = new Date();
  public mytime: Date = new Date();
  currentYear: any = this.mytime.getUTCFullYear();
  currentDate: any = this.mytime.getUTCDate() - 1;
  currentMonth: any = this.mytime.getUTCMonth() + 1; //months from 1-12
  constructor(private router: Router, private formBuilder: FormBuilder, private toast: ToastrService, private appSer: AppServiceService) {
    this.MileStoneStamp == 'Yes';
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }

  }
  projecType = "Individual";
  projLoc = "local";
  facetoface: false;
  writtentest: false;
  telephonicField: false;
  groupdiscussion: false;
  array = [];
  showMileStoneInputs = false;
  modeOfKickOffProjects = [
    { name: 'OptionA', value: 'In person Interview', checked: true },
    { name: 'OptionB', value: 'Video', checked: false },
    { name: 'OptionC', value: 'Conference Call Interview', checked: false }
  ]

  ngOnInit() {
    this.getCountries();
    window.scroll(0, 0);
    this.getIndustryData();
    this.getRolesData();
    this.getSkills();
    this.projectStartDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    }
    this.projectEndDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    }
    this.MLStartDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    }
    this.MLEndDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
    }
    // form validations
    this.postGigForm = this.formBuilder.group({
      gig_title: ['', Validators.required],
      gig_desc: ['', Validators.required],
      industry_type: ['', Validators.required],
      years_of_exp: ['', Validators.required],
      role: ['', Validators.required],
      skills: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      type_of_project: ['', Validators.required],
      project_start_date: ['', Validators.required],
      project_end_date: ['', Validators.required],
      project_process: ['Individual', Validators.required],
      project_type: ['Local / Domestic Project', Validators.required],
      mode_of_engagement: ['Local / Domestic Project', Validators.required],
      project_milestone: ['No', Validators.required],
      exclusivity: ['Yes', Validators.required],
      //duration: ['', Validators.required],
      no_of_vacancies: ['', Validators.required],
      //mode_project_kick_off: ['',Validators.required],
      project_owner: ['', Validators.required],
      key_deliverables: ['', Validators.required],
      payment_currency: ['', Validators.required],
      payment_price: ['', Validators.required],
      payment_type: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      // milestoneprice: ['', Validators.required],
      // mileStone_Description: ['', Validators.required],
      // milestone_title: ['', Validators.required]
    });
    // form validations

    this.mileStoneForm = this.formBuilder.group({
      milestone_title: ['', Validators.required],
      milestone_desc: ['', Validators.required],
      milestone_start_date: ['', Validators.required],
      milestone_end_date: ['', Validators.required],
      milestone_currency: ['', Validators.required],
      milestone_price: ['', Validators.required],
    });
  }

  validateModeOfKickOffProjects() {
    return this.modeOfKickOffProjects.filter(x => x.checked).length > 0 ? true : false;
  }

  changeMileStone(value) {
    this.MileStoneStamp = value;
    if (this.MileStoneStamp == 'Yes') {
      this.showMileStoneInputs = true;
      // this.t.push(this.formBuilder.group({
      //   milestoneprice: ['', Validators.required]
      // }));
    }
    else {
      this.showMileStoneInputs = false;
    }
  }
  changeproject(loaction) {
    this.projLoc = loaction.target.value;
  }

  onProjectStartDateChanged(event) {
    this.projectEndDateOptions = ({
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
  }

  onProjectEndDateChanged(event) {
    this.projectStartDateOptions = ({
      dateFormat: 'dd/mm/yyyy',
      disableSince: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
  }

  onMLStartDateChanged(event) {
    this.MLEndDateOptions = ({
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
  }

  onMLEndDateChanged(event) {
    this.MLStartDateOptions = ({
      dateFormat: 'dd/mm/yyyy',
      disableSince: { year: event.date['year'], month: event.date['month'], day: event.date['day'] }
    });
  }

  

  rolesList;
  getRolesData() {
    this.appSer.getRoles().subscribe((res) => {
      this.rolesList = res['roles']
    })
  }
  getSkills() {
    this.appSer.getSkillList().subscribe((res) => {
     // this.skillsList = res['skills'].map(x => x.skill_name);
     this.skillsList = res['skills'];
    });
  }
  CountiresList;
  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
      this.postGigForm.patchValue({ 'country': null });
    })
  }
  countryId; statesList; MobileCode;
  changeCountryList(id) {
    this.countryId = id;
    let params = {
      country_id: this.countryId,
    }
    this.appSer.statesList(params).subscribe((res) => {
      this.statesList = res['states'];
      this.postGigForm.patchValue({ 'state': null });// .reset();
      this.postGigForm.patchValue({ 'city': null });

      let params1 = {
        state_id: this.stateId,
      }
      this.appSer.citiesList(params1).subscribe((res) => {
        this.citiesList = res['cities'];
        this.postGigForm.patchValue({ 'city': null });
      })
    })
  }
  stateId; citiesList;
  changeStateList(id) {
    this.stateId = id;
    let params = {
      state_id: this.stateId,
    }
    this.appSer.citiesList(params).subscribe((res) => {
      this.citiesList = res['cities'];
      this.postGigForm.patchValue({ 'city': null });
    })
  }
  formData = {
    facetoface: '',
    writtentest: '',
    telephonic: '',
    groupdiscussion: '',
    walkin: ''
  }
  IndustryList;
  getIndustryData() {
    this.appSer.getIndustryList().subscribe((res) => {
      this.IndustryList = res['industries'];
    })
  }
  get f() { return this.postGigForm.controls; }
  //get t() { return this.f.milestone as FormArray; }
  get f_ms() { return this.mileStoneForm.controls; }

  onAddMilestoneClick() {
    this.submitted_MS = true;
    if (this.mileStoneForm.invalid) {
      return;
    }

    var requestObject = {
      "milestone_title": this.f_ms["milestone_title"].value,
    "milestone_description": this.f_ms["milestone_desc"].value,
    "milestone_start_date":  this.f_ms["milestone_start_date"].value.date ?
    `${this.f_ms["milestone_start_date"].value.date.year}-${this.f_ms["milestone_start_date"].value.date.month}-${this.f_ms["milestone_start_date"].value.date.day}` : '',
    "milestone_end_date":  this.f_ms["milestone_end_date"].value.date ?
    `${this.f_ms["milestone_end_date"].value.date.year}-${this.f_ms["milestone_end_date"].value.date.month}-${this.f_ms["milestone_end_date"].value.date.day}` : '',
    "milestone_price":  `${this.f_ms["milestone_currency"].value} ${this.f_ms["milestone_price"].value}`
    }

    this.projectMileStones.push(requestObject);
    this.submitted_MS  = false;
    this.mileStoneForm.reset();
    this.mileStoneForm.patchValue({ 'milestone_currency': "" }); 

    this.MLStartDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
      disableSince: {}
    }
    this.MLEndDateOptions = {
      dateFormat: 'dd/mm/yyyy',
      disableUntil: { year: this.currentYear, month: this.currentMonth, day: this.currentDate },
      disableSince: {}
    }

  }

  removeMileStone(index){
    this.projectMileStones.splice(index, 1);
  }

  onPostAGigSubmit() {
    this.postGigForm.value.hiringprocess = [this.formData];
    this.submitted = true;
    // stop here if form is invalid


    var company_id = ''; 
    var industry_type = '';
    if(localStorage.getItem('company_id')){
      company_id = localStorage.getItem('company_id');
    }

    if(localStorage.getItem('industry_type')){
      industry_type = localStorage.getItem('industry_type');
    }

    if (this.postGigForm.invalid) {
      return;
    }

    if(this.f["project_milestone"].value == 'Yes' && this.projectMileStones.length == 0){
      this.isMileStoneInfoValid = false;
      return;
    }
    else{
      this.isMileStoneInfoValid = true;
    }

    if(!this.validateModeOfKickOffProjects()){
      return;
    }
    

    
    var requestObject =
    {
      "company_id": company_id,
      "industry_type": industry_type,
      "gig_title": this.f['gig_title'].value,
      "gig_description": this.f['gig_desc'].value,
      "industry_id": this.f['industry_type'].value,
      "skills": this.f["skills"].value ? this.f["skills"].value.join(',') : '',
      "years_of_experience": this.f["years_of_exp"].value,
      "role_id": this.f["role"].value,
      "country_id": this.f["country"].value,
      "state_id": this.f["state"].value,
      "city_id": this.f["city"].value,
      "job_location": this.f["location"].value,
      "type_of_project": this.f["type_of_project"].value,
      "project_start_date": this.f["project_start_date"].value.date ?
        `${this.f["project_start_date"].value.date.year}-${this.f["project_start_date"].value.date.month}-${this.f["project_start_date"].value.date.day}` : '',
      "project_end_date": this.f["project_end_date"].value.date ?
        `${this.f["project_end_date"].value.date.year}-${this.f["project_end_date"].value.date.month}-${this.f["project_end_date"].value.date.day}` : '',
      "no_of_vacancies": this.f["no_of_vacancies"].value,
      "project_process": this.f["project_process"].value,
      "project_type": this.f["project_type"].value,
      "mode_of_engagement": this.f["mode_of_engagement"].value,
      "exclusivity": this.f["exclusivity"].value,
      "project_milestone": this.f["project_milestone"].value,
      "milestones": this.f["project_milestone"].value == 'Yes' ? this.projectMileStones : [],
      "mode_of_project_kickoff": this.modeOfKickOffProjects.filter(x => x.checked).map(x => x.value) ? this.modeOfKickOffProjects.filter(x => x.checked).map(x => x.value).join(', ') : '',
      "project_owner": this.f["project_owner"].value,
      "key_deliverables": this.f["key_deliverables"].value,
      "payment": `${this.f["payment_currency"].value} ${this.f["payment_price"].value} ${this.f["payment_type"].value}`
    }

    this.appSer.postAGig(requestObject).subscribe((res)=>{
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
        this.router.navigate(['/companydashboard']);
       
      }
      
      else {
        this.toast.error(res['message'], "error");

      }
      
      //this.createGigForm.reset();
      //this.createGigForm.markAsPristine();
    });
    

  }


}
