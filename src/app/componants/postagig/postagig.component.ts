import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-postagig',
  templateUrl: './postagig.component.html',
  styleUrls: ['./postagig.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class PostagigComponent implements OnInit {
  postGigForm: FormGroup;
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder) { }
  facetoface: false;
  writtentest: false;
  telephonicField: false;
  groupdiscussion: false;
  array = [];
  ngOnInit() {
    window.scroll(0, 0);
    // form validations
    this.postGigForm = this.formBuilder.group({
      typeofgig: ['gigsupto6months', Validators.required],
      designation: ['', Validators.required],
      qualificationeligibility: ['', Validators.required],
      joblocation: ['', Validators.required],
      yearofgraduation: ['', Validators.required],
      cgpa: ['', Validators.required],
      highestqualification: ['', Validators.required],
      skills: ['', Validators.required],
      jobdescription: ['', Validators.required],
      monthlysalmin: ['', Validators.required],
      monthlysalmax: ['', Validators.required],
      hidesalary: ['', Validators.required],
      hiringprocess: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
    // form validations
  }

  formData = {
    facetoface: '',
    writtentest: '',
    telephonic: '',
    groupdiscussion: '',
    walkin: ''
  }


  get f() { return this.postGigForm.controls }
  onSubmit() {
    this.postGigForm.value.hiringprocess = [this.formData];
    this.submitted = true;
    // stop here if form is invalid
    if (this.postGigForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.postGigForm.value, null, 4));
  }


}
