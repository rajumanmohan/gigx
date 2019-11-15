import { Router } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrls: ['./registration-data.component.scss']
})
export class RegistrationDataComponent implements OnInit {
  companyData: any;
  config: any;
  imgBaseUrl = "http://gigxglobal.com/company/";
  constructor(private appSer: AppServiceService, private router: Router) {

  }

  ngOnInit() {
    this.getcompanydata();
    window.scroll(0, 0);
  }
  getcompanydata() {
    this.appSer.getCompanyData().subscribe(res => {
      this.companyData = res['companies'];
    })
  }


}
