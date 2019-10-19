import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrls: ['./registration-data.component.scss']
})
export class RegistrationDataComponent implements OnInit {
  companyData: any;
  constructor(private appSer: AppServiceService) { }

  ngOnInit() {
    this.getcompanydata();
  }
  getcompanydata() {
    this.appSer.getCompanyData().subscribe(res => {
      this.companyData = res;
    })
  }

}
