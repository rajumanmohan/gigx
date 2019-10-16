import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper, MatStep } from '@angular/material';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  // stepper: any;
  @ViewChild(MatHorizontalStepper, { static: false }) stepper: MatHorizontalStepper;

  constructor() { }

  ngOnInit() {
  }


}
