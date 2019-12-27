import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from './../../Services/app-service.service';

@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.component.html',
  styleUrls: ['./payment-sucess.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class PaymentSuccessComponent implements OnInit {
  subscriptionId;
  companyId;
  paymentId;
  token;
  payerID;
  paymentReponseStatus;

  constructor(private router: Router, private toast: ToastrService, private appService: AppServiceService, private route: ActivatedRoute) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }

    this.subscriptionId = this.route.snapshot.queryParamMap.get('subscriptionId');
    this.companyId = this.route.snapshot.queryParamMap.get('companyId');
    this.paymentId = this.route.snapshot.queryParamMap.get('paymentId');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.payerID = this.route.snapshot.queryParamMap.get('PayerID');
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.updatePaymentStatus();
  }
  updatePaymentStatus(){
    var requestObj ={
      companyId: this.companyId,
      subscriptionId: this.subscriptionId,
      paymentToken: this.token,
      paymentStatus: 1,
      payerId: this.payerID
    };
    this.appService.updatePaymentStatus(requestObj).subscribe((res) => {
      this.paymentReponseStatus = res['status'];
      if (res['status'] == 200) {
      } else {
       
      }
    })
  }
  
}
