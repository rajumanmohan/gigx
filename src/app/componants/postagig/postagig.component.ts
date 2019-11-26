import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
  constructor(private router: Router, private formBuilder: FormBuilder, private toast: ToastrService, private appSer: AppServiceService) {
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
  ngOnInit() {
    this.getCountries();
    window.scroll(0, 0);
    this.getIndustryData();
    this.getCountries();

    // form validations
    this.postGigForm = this.formBuilder.group({
      gigdescription: ['', Validators.required],
      industry_type: ['', Validators.required],
      yearofexp: ['', Validators.required],
      role: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      availability: ['', Validators.required],
      projecttype: ['', Validators.required],
      projectowner: ['', Validators.required],
      joblocation: ['', Validators.required],
      duration: ['', Validators.required],
      currency: ['', Validators.required],
      price: ['', Validators.required],
      hiringprocess: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
    // form validations
  }
  changeproject(loaction) {
    this.projLoc = loaction.target.value;
  }
  changeType1(sst) {
    this.projecType = sst.target.value;
  }
  mydate;
  onDateChanged(date) {
    // var newDate = date.date['year'] + "-" + date.date['month'] + "-" + date.date['date'];
    this.mydate = date.date;
  }
  CountiresList;
  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
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
      this.stateId = res['states'].state_id;

      let params1 = {
        state_id: this.stateId,
      }
      this.appSer.citiesList(params1).subscribe((res) => {
        this.citiesList = res['cities'];
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
  get f() { return this.postGigForm.controls }
  onSubmit() {
    this.postGigForm.value.hiringprocess = [this.formData];
    this.submitted = true;
    // stop here if form is invalid
    if (this.postGigForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.postGigForm.value, null, 4));
  }


}
