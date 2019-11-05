import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  degreeArray = ["Full time", "Part time", "Correspandence"];
  radioItems = ["Full time", "Part time", "Correspandence"];

  constructor(private fb: FormBuilder, private toast: ToastrService, private appSer: AppServiceService) { }
  // Step 1 -> full_name,email,password,mobile_code,mobile,location,talent_attachment,talent_attachment_video,gender,dob
  // routerLink="/talentdashboard"
  ngOnInit() {
    this.registrationForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile_code: [+61],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      location: ['', Validators.required],
      // Dob: ['', Validators.required],
      termsConditions: [false, Validators.requiredTrue]
    })
    this.registrationForm1 = this.fb.group({
      highQul: ['', Validators.required],
      qualifications: new FormArray([]),
      specialization: ['', Validators.required,],
      institution: ['', Validators.required],
      yearOfComplition: ['', Validators.required],
      degree: ['']
    });
    this.jobPreferrences = this.fb.group({
      preference_location: ['', Validators.required],
      preference_industry_type: ['', Validators.required],
      preference_role: ['', Validators.required],
      desired_employment_type: [''],
      talent_image: ['']
    });
    this.employeeForm = this.fb.group({
      current_designation: ['', Validators.required],
      current_company: ['', Validators.required],
      currency_type: ['', Validators.required],
      currency_type1: ['', Validators.required],
      currency_type2: ['', Validators.required],
      annual_salary: [''],
      industry_type: ['', Validators.required],
      role: ['', Validators.required],
      location: ['', Validators.required],
      job_details: new FormArray([]),
      date: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]

    });
    this.selDate = "2019-08-08";
    // radioArr = ["Full time",""]
  }


  step1Completed = false;

  isLinear = true;

  complete() {
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    this.stepper.next();
  }

  next() {
    this.stepper.next()
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
  readUrl1(event: any) {
    console.log('readUrl');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url2 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  readUrl2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

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
    this.newArr.push(text);
    this.getData();
  }
  addEducation() {
    this.multiEducation.push({
      highQul: ''
    })
    // for (let i = 0; i < 1; i++) {
    this.f2.push(this.fb.group({
      high_qualification: ['', Validators.required],
      specialization: ['', Validators.required],
      institution: ['', Validators.required],
      year_of_complition: ['', Validators.required],
      degree: [this.degree]
      // email: ['', [Validators.required, Validators.email]]
    }));
  }
  remove(i) {
    this.f2.controls.splice(i, 1);
    console.log(this.f2.controls);
  }
  addEmployee() {
    // this.multiEmployee.push({
    //   highQul: ''
    // })
    this.f5.push(this.fb.group({
      current_designation: ['', Validators.required],
      current_company: ['', Validators.required],
      currency_type: ['', Validators.required],
      currency_type1: ['', Validators.required],
      currency_type2: ['', Validators.required],
      annual_salary: [''],
      industry_type: ['', Validators.required],
      role: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      date1: ['', Validators.required],
      month1: ['', Validators.required],
      year1: ['', Validators.required]
    }))

  }
  get f() { return this.registrationForm.controls; }
  registration() {
    console.log(this.registrationForm.value);

    this.submitted = true;
    this.registrationForm.value.talent_attachment = this.url2;
    this.registrationForm.value.gender = this.gender;
    this.registrationForm.value.talent_attachment_video = this.url3;
    this.registrationForm.value.dob = (this.selDate);
    this.registrationForm.value.mobile = JSON.parse(this.registrationForm.value.mobile);

    delete this.registrationForm.value.termsConditions;
    if (this.registrationForm.invalid) {
      return;
    }

    if (this.registrationForm.value.talent_attachment || this.registrationForm.value.talent_attachment_video == undefined) {
      this.toast.warning("Upload image or video is missing", "Warning");
    } else {
      this.complete();
      this.object1 = this.registrationForm.value;
    }

    console.log(this.registrationForm.value);
  }
  get f1() { return this.registrationForm1.controls; }
  get f2() { return this.f1.qualifications as FormArray }
  chnageDegree(event) {
    this.degree = event.target.value;
  }
  chnageDegree1(event) {
    this.degree = event.target.value;
  }
  employeeType(event) {
    this.empType = event.target.value;
    console.log(this.empType);
  }
  registration1() {
    this.registrationForm1.value.degree = this.degree;
    this.obj2['high_qualification'] = this.registrationForm1.value.highQul;
    this.obj2['specialization'] = this.registrationForm1.value.specialization;
    this.obj2['institution'] = this.registrationForm1.value.institution
    this.obj2['year_of_complition'] = this.registrationForm1.value.yearOfComplition;
    this.obj2['degree'] = this.registrationForm1.value.degree;
    // this.registrationForm1.value.qualifications.unshift(this.obj2);//temp

    this.submitted1 = true;
    if (this.registrationForm1.invalid) {
      return;
    } else {
      this.registrationForm1.value.qualifications.unshift(this.obj2);
      this.params = this.registrationForm.value;
      this.params['qualifications'] = this.registrationForm1.value.qualifications;
      this.array1 = this.registrationForm1.value.qualifications;

      this.complete();
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
      this.object2 = this.jobPreferrences.value;
      console.log(this.object2)
      this.complete();
      this.registerTalent();
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

    this.obj3['current_designation'] = this.employeeForm.value.current_designation;
    this.obj3['current_company'] = this.employeeForm.value.current_company;
    this.obj3['annual_salary'] = this.employeeForm.value.annual_salary;
    this.obj3['working_period'] = this.employeeForm.value.working_period;
    this.obj3['location'] = this.employeeForm.value.location;
    this.obj3['industry_type'] = this.employeeForm.value.industry_type;
    this.obj3['role'] = this.employeeForm.value.role;

    // this.employeeForm.value.skills = this.newArr;
    this.submitted3 = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      this.complete();
      this.employeeForm.value.job_details.unshift(this.obj3);
      console.log("employee arr new final", this.employeeForm.value)
      this.array2 = this.employeeForm.value.job_details;
    }
  }
  changeGender(e) {
    this.gender = e.target.value;
  }
  onDateChanged(date) {
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];
    this.mydate = date.date;
    this.selDate = (this.mydate['year']) + "-" + (this.mydate['month']) + "-" + (this.mydate['day']) || "2019-08-08";


  }
  registerTalent() {
    var overObjet = this.object1;
    Object.assign(overObjet, this.object2);
    // this.registrationForm1.value.qualifications  (org)
    overObjet['qualifications'] = this.registrationForm1.value.qualifications;
    // this.employeeForm.value.job_details (org)
    overObjet['job_details'] = this.employeeForm.value.job_details;
    console.log(overObjet);
    var obj =
      this.appSer.registrationTalent(overObjet).subscribe(res => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "success");
        } else {
          this.toast.error(res['message'], "error");

        }
      })
  }
}
