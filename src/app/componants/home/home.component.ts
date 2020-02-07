import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { DataStorageService } from '../../Services/data-storage.service';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../assets/css/animate.css'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService, private dataStorage: DataStorageService, private appSer: AppServiceService, private toast: ToastrService,
    private formBuilder: FormBuilder) { }
    submitEmail = false;
    subscribeFrom: FormGroup;
  ngOnInit() {
    window.scroll(0, 0);
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
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
  onDashboardClick() {
    if (this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.COMPANY) {
      this.router.navigate(['/companydashboard']);
    } 
    else if (this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.TALENT) {
      this.router.navigate(['/talentdashboard']);
    }

  }


}


