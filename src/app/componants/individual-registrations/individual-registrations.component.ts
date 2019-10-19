import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-registrations',
  templateUrl: './individual-registrations.component.html',
  styleUrls: ['./individual-registrations.component.scss']
})
export class IndividualRegistrationsComponent implements OnInit {
  imgBaseUrl = "http://gigxglobal.com/company/";
  individualData: any;
  companyData = []
  constructor(private appSer: AppServiceService) { }

  ngOnInit() {
    this.getindividualData();
  }
  getindividualData() {
    this.appSer.getindividualData().subscribe(res => {
      this.companyData = res['individuals'];

    })
  }
}
