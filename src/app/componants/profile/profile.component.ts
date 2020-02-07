import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { DataStorageService } from '../../Services/data-storage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  page; companyId; loginType;
  editCompanyForm: FormGroup; submit = false;
  editIndividualForm: FormGroup;
  edit = false;
  sstType = "SST Unregistered"
  submitted = false; ProfileImageUrl;
  constructor(private route: ActivatedRoute, private appSer: AppServiceService, private toast: ToastrService, private formBuilder: FormBuilder, private router: Router,  private dataStorage: DataStorageService) {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    });
    this.companyId = localStorage.getItem('company_id');
    this.loginType = localStorage.getItem('industry_type');
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  CountiresList;
  ngOnInit() {
    window.scroll(0, 0);
    this.getCountries();
    this.getIndustryData();
    // company pr
    this.getCompanyProfile();
    this.editCompanyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_url: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      industry_type: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      company_registration: ['', Validators.required],
      contact_person_name: ['', Validators.required],
      designation: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      mobile_code: ['', Validators.required],
      mobile: ['', [Validators.required]],
    });
    this.editIndividualForm = this.formBuilder.group({
      industry_type: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      contact_person_name: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile_code: ['', Validators.required],
      mobile: ['', [Validators.required]],
    });


  }
  countryNameId; stateNameId;
  getCountries() {
    this.appSer.countriesList().subscribe((res) => {
      this.CountiresList = res['countries'];
    });
  }
  IndustryList;
  getIndustryData() {
    this.appSer.getIndustryList().subscribe((res) => {
      this.IndustryList = res['industries'];
    })
  }
  industryId;
  changeIndustryTypeList(industry) {
    for (var i = 0; i < this.IndustryList.length; i++) {
      if (industry == this.IndustryList[i].industry_name) {
        console.log(this.IndustryList[i].industry_name)
        this.industryId = this.IndustryList[i].industry_id;
      }
    }
  }
  countryId; statesList; mobile_code;
  changeCountryList(name) {
    for (var i = 0; i < this.CountiresList.length; i++) {
      if (name == this.CountiresList[i].country_name) {
        this.countryId = this.CountiresList[i].country_id;
      }
    }
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



  // company profile edit
  changeType1(sst) {
    this.sstType = sst.target.value;
  }
  editProfile() {
    window.scroll(0, 0);
    this.edit = true;
    this.getCompanyProfile();
    this.strImage = '';
  }
  profileDetails = []; profileFormDetails;
  get f1() { return this.editCompanyForm.controls; };
  get f2() { return this.editIndividualForm.controls; };
  submitEdit() {
    if (this.loginType == 'company') {
      this.submitted = true;
      this.editCompanyForm.value.company_id = this.companyId;
      this.editCompanyForm.value.sst = this.sstType;
      this.editCompanyForm.value.industry_type = this.industryId;
      this.editCompanyForm.value.company_type = this.loginType;
      this.editCompanyForm.value.company_old_image = this.ProfileImage;
      this.editCompanyForm.value.country = this.countryId;
      this.editCompanyForm.value.state = this.stateId;
      this.editCompanyForm.value.city = this.cityId;
      if (!this.strImage) {
        this.editCompanyForm.value.company_image = '';
      }
      else {
        this.editCompanyForm.value.company_image = this.strImage;
      }
      if (this.editCompanyForm.invalid) {
        return;
      }
      this.appSer.CompanyEditProfile(this.editCompanyForm.value).subscribe((res) => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.getCompanyProfile();
          this.edit = false;
          window.scroll(0, 0);
        }
        else {
          this.toast.error(res['message'], "Error");
          this.edit = false;
          window.scroll(0, 0);
        }
      })
    }
    else if (this.loginType == 'individual') {
      this.submitted = true;
      this.editIndividualForm.value.company_id = this.companyId;
      this.editIndividualForm.value.company_type = this.loginType;
      this.editIndividualForm.value.company_old_image = this.ProfileImage;

      this.editIndividualForm.value.country = this.countryId;
      this.editIndividualForm.value.state = this.stateId;
      this.editIndividualForm.value.city = this.cityId;
      this.editIndividualForm.value.industry_type = this.industryId;
      if (!this.strImage) {
        this.editIndividualForm.value.company_image = '';
      }
      else {
        this.editIndividualForm.value.company_image = this.strImage;
      }

      if (this.editIndividualForm.invalid) {
        return;
      }
      this.appSer.CompanyEditProfile(this.editIndividualForm.value).subscribe((res) => {
        if (res['status'] == 200) {
          this.toast.success(res['message'], "Success");
          this.getCompanyProfile();
          this.edit = false;
          window.scroll(0, 0);
        }
        else {
          this.toast.error(res['message'], "Error");
          this.edit = false;
          window.scroll(0, 0);
        }
      })
    }
  }
  ProfileImage;
  getCompanyProfile() {
    let params = {
      company_type: this.loginType,
      company_id: this.companyId
    }
    this.appSer.CompanyProfile(params).subscribe((res) => {
      this.profileDetails = res['data'];  
      //Header populate data        
      localStorage.setItem('company_name', this.profileDetails['company_name']);
      this.dataStorage.loggedInUserData = localStorage;
      //Comapny profile populate data
      this.profileFormDetails = this.profileDetails;
      this.ProfileImage = this.profileDetails['logo'];
      this.ProfileImageUrl = this.profileDetails['logo_url'];
      this.countryId = this.profileDetails['country_id'];
      this.stateId = this.profileDetails['state_id'];
      this.cityId = this.profileDetails['city_id'];
      this.industryId = this.profileDetails['industry_id']
      this.getStates();
      this.getCities();
      if (this.loginType == 'company') {
        this.editCompanyForm = this.formBuilder.group({
          company_name: [this.profileFormDetails.company_name, Validators.required],
          company_url: [this.profileFormDetails.company_url, Validators.required],
          email: [this.profileFormDetails.company_email, [Validators.required, Validators.email]],
          industry_type: [this.profileFormDetails.industry_name, Validators.required],
          address: [this.profileFormDetails.address, Validators.required],
          state: [this.profileFormDetails.state, Validators.required],
          city: [this.profileFormDetails.city, Validators.required],
          country: [this.profileFormDetails.country, Validators.required],
          pincode: [this.profileFormDetails.postal_code, Validators.required],
          company_registration: [this.profileFormDetails.company_registration, Validators.required],
          contact_person_name: [this.profileFormDetails.contact_person, Validators.required],
          designation: [this.profileFormDetails.designation, Validators.required],
          contact_email: [this.profileFormDetails.contact_email, [Validators.required, Validators.email]],
          mobile_code: [null, Validators.required],
          mobile: [this.profileFormDetails.mobile, Validators.required]
        });

        // setTimeout(() => {
        this.editCompanyForm.patchValue({ 'mobile_code': this.profileFormDetails.mobile_code });
        // }, 10);

      }
      else if (this.loginType == 'individual') {
        this.editIndividualForm = this.formBuilder.group({
          email: [this.profileFormDetails.email, [Validators.required, Validators.email]],
          industry_type: [this.profileFormDetails.industry_name, Validators.required],
          address: [this.profileFormDetails.address, Validators.required],
          state: [this.profileFormDetails.state, Validators.required],
          city: [this.profileFormDetails.city, Validators.required],
          country: [this.profileFormDetails.country, Validators.required],
          pincode: [this.profileFormDetails.postal_code, Validators.required],
          contact_person_name: [this.profileFormDetails.contact_person, Validators.required],
          designation: [this.profileFormDetails.designation, Validators.required],
          mobile_code: [null, Validators.required],
          mobile: [this.profileFormDetails.mobile, [Validators.required]]
        });
        // setTimeout(() => {
        this.editIndividualForm.patchValue({ 'mobile_code': this.profileFormDetails.mobile_code });
        // }, 10);

      }
    })
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
  cancel() {
    this.edit = false;
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
}
