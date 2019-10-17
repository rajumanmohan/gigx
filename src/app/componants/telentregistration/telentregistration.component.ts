import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper, MatStep } from '@angular/material';

@Component({
  selector: 'app-telentregistration',
  templateUrl: './telentregistration.component.html',
  styleUrls: ['./telentregistration.component.scss']
})
export class TelentregistrationComponent implements OnInit {
  @ViewChild(MatHorizontalStepper, { static: false }) stepper: MatHorizontalStepper;
  url1;
  newArr = [];
  test;
  Data = [];
  url2;
  url3;
  constructor() { }

  ngOnInit() {

  }
  step1Completed = false;

  isLinear = true;

  complete() {
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    this.stepper.next();
  }

  next() {
    this.stepper.next()
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
  readUrl1(event: any) {
    console.log('readUrl');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url2 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  readUrl2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url3 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  getData() {
    // for (var i = 0; i < this.newArr.length; i++) {
    this.Data = this.newArr;
    // }
  }
  add(text) {
    this.newArr.push(text);
    console.log(this.newArr)
    this.getData();
  }
}
