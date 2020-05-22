import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../Services/data-storage.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private dataStorage: DataStorageService, private router: Router, private appSer: AppServiceService, private toast: ToastrService,
    private formBuilder: FormBuilder) { }
  subscribeFrom: FormGroup;
  submitEmail = false;
  ngOnInit() {
    window.scroll(0, 0);
    this.subscribeFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  get sub() { return this.subscribeFrom.controls }
  submitsubscribe() {
    this.submitEmail = true;
    if (this.subscribeFrom.invalid) {
      return;
    } else {
      this.router.navigate(['/createaccount']);
    }
  }
  onDashboardClick() {
    if (this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.COMPANY) {
      this.router.navigate(['/companydashboard']);
    }
    else if (this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.TALENT) {
      this.router.navigate(['/talentdashboard']);
    }
  }
}
