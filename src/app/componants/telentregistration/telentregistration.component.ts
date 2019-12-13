import { Router, ActivatedRoute } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-telentregistration',
  templateUrl: './telentregistration.component.html',
  styleUrls: ['./telentregistration.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class TelentregistrationComponent implements OnInit {
  @ViewChild(MatHorizontalStepper, { static: false }) stepper: MatHorizontalStepper;
  url1;
  newArr = [];
  test;
  Data = [];
  url2;
  url3;
  multiEducation = [];
  multiEmployee = [];
  registrationForm: FormGroup;
  submitted = false;
  submitted1 = false;
  registrationForm1: FormGroup;
  jobPreferrences: FormGroup;
  employeeForm: FormGroup;
  education: FormGroup;
  educationArr = [];
  obj2 = {};
  degree = "Full time";
  degree1 = "Full time"
  submitted4 = false;
  submitted3 = false;
  empType;
  gender = "Male";
  selDate;
  dateFormat: 'yyyy-dd-mm.'
  params = {};
  object1 = {};
  array1 = [];
  obj3 = {};
  array2 = [];
  object2 = {};
  mydate;
  type_id = 1;
  test1 = "5666666"
  degreeArray = ["Full time", "Part time", "Online"];
  radioItems = ["Full time", "Part time", "Online"];
  showEye = true;
  nestedForm;
  CountiresList;
  highestQualificationList = [];
  stateId;
  citiesList;
  email;
  password;
  mobile_code;
  isProfesionalCertification=false;
  institutionsList = [];

  stepone_details = {};
  steptwo_details = {};
  steptwo_detailsArray=[];
  stepthree_details = {};
  stepfour_details = {};
  
  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  private workingSinceOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  private workingFromOptions: IMyDpOptions[] = [];
  private workingToOptions: IMyDpOptions[] = [];

  constructor(private fb: FormBuilder, private toast: ToastrService, private appSer: AppServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.password = params.password;
    })
  }
  ngOnInit() {
    window.scroll(0, 0);
    let d: Date = new Date('2001/04/05');
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      mobile_code: ['60'],
      mobile: ['',  Validators.compose([Validators.required, Validators.maxLength(15)])],
      location: ['', Validators.required],
      country_id: ['132', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      linkedIn: [''],
      personal_website: [''],
      dob: [''],
      termsConditions: [false, Validators.requiredTrue]
    })
    this.registrationForm1 = this.fb.group({
      highQul: ['', Validators.required],
      qualifications: new FormArray([]),
      institution: ['', Validators.required],
      year_of_completion: ['', Validators.required],
      professional_qualification:[''],
      degree: ['']
    });
    this.jobPreferrences = this.fb.group({
      "preference_location": ['', Validators.required],
      "preference_industry_type": ['', Validators.required],
      "preference_role": ['', Validators.required],
      "desired_employment_type": ['Gig'],
      "talent_image": [''],
      "work_preferences":  ['Willing to Travel', Validators.required],
      "skills": ['', Validators.required]
    });
    this.employeeForm = this.fb.group({
     "work_experience": ['', Validators.required],
      "current_company": ['', Validators.required],
      "salary_input" :  ['', Validators.required],
      "currency_type": ['', Validators.required],
      "working_since": ['', Validators.required],
      "annual_salary": [''],
      "industry_type": ['', Validators.required],
      "role": ['', Validators.required],
      "role_desc": ['', Validators.required],
      "location": ['', Validators.required],
      "job_details": new FormArray([]),

    });
    this.getCountries();
    this.getSkills();
  }
  hidePassword() {
    this.showEye = !this.showEye;
  }
  showPassword() {
    this.showEye = false;
  }
  changeMobileCode() {

  }

  step1Completed = false;

  isLinear = true;

  complete() {
    this.stepper.next();
  }

  next() {
    this.stepper.next()
  }

  backStepper(){
   this.stepper.previous();
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
      degree1: [''],
      professional_qualification1:[''],
    }));
    this.type_id += 1;
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

    this.submitted1 = false;
    this.f2.markAsPristine();
    this.f2.markAsUntouched();
    this.f2.updateValueAndValidity();

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
  closeSkill(skill) {
    this.newArr.splice(skill, 1);
  }
 
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
    "salary_input" :  ['', Validators.required],
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
  get f() { return this.registrationForm.controls; }
  registration() {
    this.submitted = true;
    this.registrationForm.value.talent_attachment = this.url2;
    this.registrationForm.value.gender = this.gender;
    this.registrationForm.value.talent_attachment_video = this.url3;
    this.registrationForm.value.dob = (this.selDate);
    this.registrationForm.value.mobile ? JSON.parse(this.registrationForm.value.mobile) : '';
    this.registrationForm.value.mobile_code = this.mobile_code;
    delete this.registrationForm.value.termsConditions;

    if(this.registrationForm.controls['state_id'].value =='null'){
      this.registrationForm.patchValue({'state_id' : null});// .reset();
    }
    
    if(this.registrationForm.controls['city_id'].value =='null'){
      this.registrationForm.patchValue({'city_id' : null});// .reset();
    }
    

    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.value);

    if ((this.registrationForm.value.talent_attachment == undefined && (this.registrationForm.value.talent_attachment_video == undefined))) {
      //this.toast.warning("Upload image or video is missing", "Warning");
      return false;
    }

    else {
      this.stepone_details={  
        "first_name": this.registrationForm.value.first_name,
        "last_name": this.registrationForm.value.last_name,
        "email":this.route.snapshot.queryParams.email,
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
          console.log('steponedetails:-')
          console.log(this.stepone_details);
          console.log('completed')
      this.complete();
      this.getHighestQualificationList();
      this.getInstitutionsListBasedOnCountry(this.registrationForm.value.country_id);
      this.getYearOfCompletions();
      this.object1 = this.registrationForm.value;
    }
    console.log(this.registrationForm.value);
  }

  chnageDegree(event) {
    this.degree = event.target.value;
  }
  chnageDegree1(event) {
    this.degree1 = event.target.value;
    for (var i = 0; i < this.registrationForm1.value.qualifications.length; i++) {
      this.registrationForm1.value.qualifications[i].degree = this.degree1;
      console.log(this.registrationForm1.value.qualifications[i].degree);
      console.log(this.registrationForm1.value.qualifications[i]);
    }
  }
  employeeType(event) {
    this.empType = event.target.value;
    console.log(this.empType);
  }
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

    if(this.registrationForm1.controls['highQul'].value == 'null')
      this.registrationForm1.patchValue({'highQul': null});
    
    if(this.registrationForm1.controls['institution'].value == 'null')
      this.registrationForm1.patchValue({'institution': null});


    for(var i =0 ; i< this.f2.controls.length; i++){
       var tempForm = this.f2.controls as FormGroup[];
      if(tempForm[i].controls['high_qualification'].value == 'null')
      tempForm[i].patchValue({'high_qualification': null});
    
    if(tempForm[i].controls['institution1'].value == 'null')
    tempForm[i].patchValue({'institution1': null});
    }

    this.obj2["hq_id"] = this.registrationForm1.value.highQul;
    this.obj2["university_id"] = this.registrationForm1.value.institution
    this.obj2["year_of_completion"] = this.registrationForm1.value.year_of_completion;
    this.obj2["professional_qualification"] = this.registrationForm1.value.professional_qualification;
    this.obj2["other_highest_qualification"]="";

    // this.registrationForm1.value.qualifications.unshift(this.obj2);//temp

    this.submitted1 = true;
    console.log("f2 values", this.f1.qualifications.invalid);
    if (this.registrationForm1.invalid) {
      return;
    } else {

      this.steptwo_detailsArray =[];
      for(var i =0 ; i< this.f2.controls.length; i++){
         var tempForm = this.f2.controls as FormGroup[];
         var qualifications={
          "hq_id":  tempForm[i].controls['high_qualification'].value,
          "other_highest_qualification": tempForm[i].controls['professional_certification1']  ? tempForm[i].controls['professional_certification1'].value : '',
          "university_id": tempForm[i].controls['institution1'].value,
          "year_of_completion": tempForm[i].controls['year_of_completion1'].value,
          "professional_qualification":tempForm[i].controls['professional_qualification1'].value,
          "mode_of_study": tempForm[i].controls['degree1'].value
        }
        this.steptwo_detailsArray.push(qualifications);
      }
      var qualifications1={
        "hq_id":  this.registrationForm1.value.highQul,
        "other_highest_qualification": this.registrationForm1.controls['professional_certification'] ? this.registrationForm1.controls['professional_certification'].value : '',
        "university_id": this.registrationForm1.value.institution,
        "year_of_completion":this.registrationForm1.value.year_of_completion,
        "professional_qualification":this.registrationForm1.value.professional_qualification,
        "mode_of_study":this.registrationForm1.value.degree
      }
      this.steptwo_detailsArray.push(qualifications1);

      this.registrationForm1.value.qualifications.unshift(this.obj2);
      this.params = this.registrationForm.value;
      this.params['qualifications'] = this.registrationForm1.value.qualifications;

      this.array1 = this.registrationForm1.value.qualifications;
      console.log("step 2", this.registrationForm1.value);
      this.steptwo_details={
        "qualifications": this.steptwo_detailsArray
      }

      console.log('steptwodetails')
      console.log(this.steptwo_details)

      this.complete();
      
      this.getIndustryTypeList();
      this.getRoleList();
    }
  }
  get f4() { return this.jobPreferrences.controls; }

  submitJob() {
    this.jobPreferrences.value.desired_employment_type = this.empType;
    this.jobPreferrences.value.skills = this.newArr.toString();
    this.jobPreferrences.value.talent_image = this.url1;
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
        "skills": this.jobPreferrences.controls['skills'].value.join(', '),
        "work_preference": this.jobPreferrences.controls['work_preferences'].value
      };

      this.stepfour_details = tempObj;

      var finalPayload = {...this.stepone_details, ...this.steptwo_details, ...this.stepthree_details, ...this.stepfour_details};
      
    

      this.object2 = this.jobPreferrences.value;
      console.log(this.object2)
      this.complete();
      this.registerTalent(finalPayload);
    }
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
      var tempObj={
          "work_experience": "",
          "company": "",
          "salary": "",
          "working_period": "",
          "location": "",
          "industry_id": "",
          "role_id": "",
          "role_description": ""
      }

      var tempEmployeeArray=[];

      var selectedWorkingSinceDate = this.employeeForm.controls['working_since'].value.date;
      tempObj.work_experience= this.employeeForm.controls['work_experience'].value;
      tempObj.company= this.employeeForm.controls['current_company'].value
      tempObj.salary= `${this.employeeForm.controls['currency_type'].value} ${this.employeeForm.controls['salary_input'].value}`;
      tempObj.working_period=  `${selectedWorkingSinceDate.year}-${selectedWorkingSinceDate.month}-${selectedWorkingSinceDate.day} to present`;
      tempObj.location= this.employeeForm.controls['location'].value; 
      tempObj.industry_id=  this.employeeForm.controls['industry_type'].value; 
      tempObj.role_id= this.employeeForm.controls['role'].value; 
      tempObj.role_description=  this.employeeForm.controls['role_desc'].value;

      tempEmployeeArray.push(tempObj);


     var tempFormGroupArray = this.employeeForm.controls['job_details'] as FormArray;
      for(var i=0;i< tempFormGroupArray.length;i++){
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
        
        var selectedWorkingFromDate =tempFormGroup.controls['working_from'].value.date; 
        var selectedWorkingToDate = tempFormGroup.controls['working_to'].value.date;
        internalObj.work_experience= tempFormGroup.controls['work_experience'].value;
        internalObj.company= tempFormGroup.controls['current_company'].value;
        internalObj.salary= `${tempFormGroup.controls['currency_type'].value} ${tempFormGroup.controls['salary_input'].value}`;
        internalObj.working_period=  `${selectedWorkingFromDate.year}-${selectedWorkingFromDate.month}-${selectedWorkingFromDate.day} to ${selectedWorkingToDate.year}-${selectedWorkingToDate.month}-${selectedWorkingToDate.day}`;
        internalObj.location= tempFormGroup.controls['location'].value;
        internalObj.industry_id=  tempFormGroup.controls['industry_type'].value;
        internalObj.role_id=  tempFormGroup.controls['role'].value;
        internalObj.role_description=  tempFormGroup.controls['role_desc'].value;
       tempEmployeeArray.push(internalObj);      
      }



      this.stepthree_details={
        "job_details":tempEmployeeArray
      }
      console.log('stepthree_details');
      console.log(this.stepthree_details);

      this.complete();
      this.employeeForm.value.job_details.unshift(this.obj3);
      console.log("step 3", this.employeeForm.value)
      this.array2 = this.employeeForm.value.job_details;

      if(this.jobPreferrences.controls['preference_industry_type'].value == 'null' 
      || !this.jobPreferrences.controls['preference_industry_type'].value) {
        this.jobPreferrences.patchValue({'preference_industry_type' : null});
      } 

      if(this.jobPreferrences.controls['preference_role'].value == 'null' 
      || !this.jobPreferrences.controls['preference_role'].value) {
        this.jobPreferrences.patchValue({'preference_role' : null});
      }
    }
  }
  changeGender(e) {
    this.gender = e.target.value;
  }
  onDateChanged(date) {
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];

    this.mydate = date.date;
    this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']);


  }

 
  onWorkingFromDateChanged(event, index){
    //this.mydate = event.date;
    this.workingToOptions[index] =({
      dateFormat: 'dd/mm/yyyy',
      disableUntil:  {year: event.date['year'], month: event.date['month'], day: event.date['day']}
    });   
  }
  onWorkingToDateChanged(event, index){
    //this.mydate = event.date;
    this.workingFromOptions[index] = ({
      dateFormat: 'dd/mm/yyyy',
      disableSince:  {year: event.date['year'], month: event.date['month'], day: event.date['day']}
    });   
  }
  registerTalent(finalPayload) {
    //var overObjet = this.object1;
    //Object.assign(overObjet, this.object2);
    // this.registrationForm1.value.qualifications  (org)
    //overObjet['qualifications'] = this.registrationForm1.value.qualifications;
    // this.employeeForm.value.job_details (org)
    //overObjet['job_details'] = this.employeeForm.value.job_details;
    //console.log(overObjet);
    var obj =
      this.appSer.registrationTalent(finalPayload).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "success");
          this.router.navigate(['/login']);
        } else {
          this.toast.error(res['message'], "error");

        }
      })
  }
  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
      this. changeCountryList(132);
    })
  }

  getHighestQualificationList() {
    if(this.highestQualificationList.length == 0){
    this.appSer.getHighestQualicationList().subscribe((res)=>{
      this.highestQualificationList = res['highestQualifications'];
      this.registrationForm1.patchValue({'highQul': null});
    });
  }
  }

  industryTypes = []; roles =[];
  getIndustryTypeList(){
    if(this.industryTypes.length == 0){
    this.appSer.getIndustryTypeList().subscribe((res)=>{
      this.industryTypes = res['industries'];
      this.employeeForm.patchValue({'industry_type': null});
    });
  }
  }
  getRoleList(){
    if(this.roles.length == 0){
    this.appSer.getRoleList().subscribe((res)=>{
      this.roles = res['roles'];
      this.employeeForm.patchValue({'role': null});
    });
  }
  }
  

  onHighestQualificationChange(event: any){
    if(event.currentTarget.value == '4'){
     
      this.isProfesionalCertification=true;
      this.registrationForm1.addControl('professional_certification',new FormControl('',Validators.required));
    }
    else{
      this.isProfesionalCertification=false;
      this.registrationForm1.removeControl('professional_certification');
    }
  }

  currentIndex = 0;
  onHighestQualificationChangeOther(event: any,index, ngForm){
    if(event.currentTarget.value == '4'){
      ngForm.addControl('professional_certification1',new FormControl('',Validators.required));
    }
    else{
      ngForm.removeControl('professional_certification1');
    }
    this.currentIndex=index+1;
  }

  isOtherRoleSelected = false;
  onJobPreferenceRoleChange(event: any){
    if(event.currentTarget.value == '8'){
      this.isOtherRoleSelected=true;
      this.jobPreferrences.addControl('role_others',new FormControl('',Validators.required));
    }
    else{
      this.isOtherRoleSelected=false;
      this.jobPreferrences.removeControl('role_others');
    }
  }


  countryId; statesList =[]; MobileCode;
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
       this.registrationForm.patchValue({'state_id' : null});// .reset();
       this.registrationForm.patchValue({'city_id' : null});
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
      this.registrationForm.patchValue({'city_id' : null});
    })
  }
  ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
      return { 'ageRange': true };
    }
    return null;
  }

  getInstitutionsListBasedOnCountry(counrtyId){
    if(this.institutionsList.length == 0){ 
    let params = {
      country_id: JSON.parse(counrtyId),
    }
    this.appSer.getInstitutionsList(params).subscribe((res)=>{
    
      this.institutionsList = res['universities'];
      this.registrationForm1.patchValue({'institution': null});
    });
  }
  }

  yearOfCompletionList = [];
  getYearOfCompletions(){
    for(var i=1950; i<= (new Date()).getFullYear(); i++){
      this.yearOfCompletionList.push(i);
    }
    this.registrationForm1.patchValue({'year_of_completion': null});
    
  }

  skillsList = [];
  getSkills(){
    this.appSer.getSkillList().subscribe((res)=>{
      this.skillsList = res['skills'].map(x=>x.skill_name);
    });
  }

   
}