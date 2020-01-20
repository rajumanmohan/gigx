import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../Services/data-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactFrom: FormGroup;
  subscribeFrom: FormGroup;
  submitted = false;
  submitEmail = false;
  constructor(private dataStorage: DataStorageService, public router: Router, private appSer: AppServiceService, private toast: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.contactFrom = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.subscribeFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get sub() { return this.subscribeFrom.controls }
  submitsubscribe() {
    this.submitEmail = true;
    if (this.subscribeFrom.invalid) {
      return;
    }
  }

  get f() { return this.contactFrom.controls; }
  contactSubmit() {
    this.submitted = true;
    if (this.contactFrom.invalid) {
      return;
    }
    // this.appSer
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
