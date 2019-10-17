import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  Showpaymentgateway = false;
  showPaymentType = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  showpaymentmethod() {
    this.Showpaymentgateway = true;
    this.showPaymentType = false;
  }
}
