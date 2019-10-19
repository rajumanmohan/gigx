import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrls: ['./registration-data.component.scss']
})
export class RegistrationDataComponent implements OnInit {

  constructor(private appSer: AppServiceService) { }

  ngOnInit() {
  }
  getcompanydata() {
    this.appSer.getCompanyData().subscribe(res => {

    })
  }

}
