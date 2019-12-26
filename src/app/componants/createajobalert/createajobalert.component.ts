import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-createajobalert',
  templateUrl: './createajobalert.component.html',
  styleUrls: ['./createajobalert.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class CreateajobalertComponent implements OnInit {

  skillsList =[];
  CountiresList = [];
  statesList = [];
  citiesList = [];
  workExpsList = [];
  industriesList = [];
  createGigForm: FormGroup;
  constructor(private router: Router,private toast: ToastrService, private appSer: AppServiceService, private fb: FormBuilder) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }

   get formControls() { return this.createGigForm.controls; } 
  ngOnInit() {
    window.scroll(0, 0);
    this.getSkills();
    this.getCountries();
    this.getWorkExperience();
    this.getIndustryTypeList();

    this.createGigForm = this.fb.group({
      skills: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      work_exp: ['', [Validators.required]],
      currency_type: ['', [Validators.required]],
      industry_type: ['', [Validators.required]],
      expected_salary: ['', [Validators.required]],
      location:  ['', [Validators.required]],
    })
  }

  getSkills(){
    this.appSer.getSkillList().subscribe((res)=>{
      //this.skillsList = res['skills'].map(x=>x.skill_name);
      this.skillsList = res['skills'];
    });
  }

  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
    })
  }

  countryId;
  stateId;
  changeCountryList(id) {
    this.countryId = id;

    let params = {
      country_id: this.countryId,
    }
    this.appSer.statesList(params).subscribe((res) => {
    
      this.statesList = res['states'];  
       this.createGigForm.patchValue({'state_id' : null});// .reset();
       this.createGigForm.patchValue({'city_id' : null});
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
      this.createGigForm.patchValue({'city_id' : null});
    })
  }

  getWorkExperience(){
    for(var i=15;i>=1;i--){
      this.workExpsList.push(i);
    }
    
    //this.createGigForm.patchValue({'work_exp': null});
  }

  getIndustryTypeList(){
    this.appSer.getIndustryTypeList().subscribe((res)=>{
      this.industriesList = res['industries'];
      this.createGigForm.patchValue({'industry_type': null});
    });
  
  }
  submitted =false;
  onFormSubmit(){
    this.submitted = true;
    if(this.createGigForm.invalid){
      return false;
    }

    var talent_id = '';
    if(localStorage.getItem('talent_id')){
      talent_id = localStorage.getItem('talent_id');
    }

    var requestData = {
      "talent_id": talent_id,
      "skills": this.createGigForm.controls["skills"].value.join(','),
      "country_id": this.createGigForm.controls["country_id"].value,
      "state_id": this.createGigForm.controls["state_id"].value,
      "city_id": this.createGigForm.controls["city_id"].value,
      "location": this.createGigForm.controls["location"].value,
      "work_experience": this.createGigForm.controls["work_exp"].value,
      "expected_salary": `${this.createGigForm.controls["currency_type"].value} ${this.createGigForm.controls["expected_salary"].value}`,
      "industry_id": this.createGigForm.controls["industry_type"].value
    };

    this.appSer.postCreateGigAlert(requestData).subscribe((res)=>{
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
       // this.router.navigate(['/login']);
        window.location.reload(); 
      } else {
        this.toast.error(res['message'], "error");

      }
      
      //this.createGigForm.reset();
      //this.createGigForm.markAsPristine();
    });
  }

}
