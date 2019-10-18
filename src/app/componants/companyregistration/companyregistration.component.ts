import { AppServiceService } from './../../Services/app-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.scss']
})
export class CompanyregistrationComponent implements OnInit {
  strImage;
  url1;
  indType = "";
  comType;
  state = "";
  company;
  compEmail;
  password;
  compName;
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
  constructor(private router: Router, private appSer: AppServiceService) { }

  ngOnInit() {
    this.comType = 'company';
    window.scroll(0, 0);
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
  changeType(type) {
    this.comType = type.target.value;
  }
  submit() {
    // if (this.comType == 'company') {
    this.router.navigate(['/profile'], { queryParams: { page: this.comType } })
    // }
  }
  registration() {

    let params = {
      "company_type": this.comType,
      "email": this.compEmail,
      "password": this.password,
      "company_name": this.compName,
      "company_url": this.compUrl,
      "contact_person_name": this.contactPerson,
      "contact_email": this.email,
      "designation": this.designation,
      "address": this.offAddr,
      "country": this.Country,
      "state": this.state,
      "city": this.city,
      "pincode": this.Pincode,
      "mobile_code": this.mobileCode,
      "mobile": this.mobile,
      "company_image": this.url1
    }
    if (this.comType == 'individual') {
      delete params['email'];
    }
    this.appSer.registration(params).subscribe((res) => {
      console.log(res)
    })
    alert(this.state)
  }
}
