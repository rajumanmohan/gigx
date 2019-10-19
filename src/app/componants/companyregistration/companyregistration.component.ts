import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.scss']
})
export class CompanyregistrationComponent implements OnInit {
  strImage;
  url1;
  indType = "";
  comType = "company"
  state = "";
  company;
  compEmail;
  password;
  // compName;
  compUrl;
  contactPerson;
  email;
  designation;
  Address;
  offAddr;
  Country = "";
  Pincode;
  city = "";
  mobileCode = "";
  mobile;
  registrationForm: FormGroup;
  submitted = false;
  registerForm: FormGroup;
  sstType = "SST Unregistered"
  mobcode = +91
  constructor(private router: Router, private appSer: AppServiceService, private toast: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.registrationForm = this.fb.group({
      industry_type: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company_name: ['', Validators.required],
      company_url: ['', Validators.required],
      contact_person_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")],],
      address: ['', Validators.required],
      company_registration: ['', Validators.required],
      sst: [this.sstType, ''],
      company_type: [this.comType, '']
    });

  }
  image;
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  changeType(type1) {
    this.comType = type1.target.value;
  }
  changeType1(sst) {
    this.sstType = sst.target.value;

  }
  changeMobCode(mob) {
    this.mobcode = mob.target.value;
  }
  submit() {
    // if (this.comType == 'company') {
    this.router.navigate(['/profile'], { queryParams: { page: this.comType } })
    // }
  }
  get f() { return this.registrationForm.controls; }

  registration() {
    this.registrationForm.value.company_image = this.url1;
    this.registrationForm.value.mobile_code = this.mobcode;
    console.log(this.registrationForm.value);

    this.submitted = true;
    // if (this.comType == "company") { delete this.registrationForm.value.compReg }
    if (this.registrationForm.invalid) {
      return;
    }


    this.appSer.registration(this.registrationForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        this.registrationForm.reset();
        this.submitted = false;
        this.url1 = '';
      } else {
        this.toast.error(res['message'], "error");
      }
    })

  }
  // get f() { return this.registerForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  // }
}
