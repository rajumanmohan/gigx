import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { DataStorageService } from 'src/app/Services/data-storage.service';
@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.scss'],
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
export class AppliedjobsComponent implements OnInit {

  appliedGigList = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  
  constructor(private router: Router, private toast: ToastrService, private appSer: AppServiceService, private dataStorage: DataStorageService) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['coverpage']);
    } else {
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAppliedGigs();
  }

  getAppliedGigs(){
    var requestObj = {'talent_id': this.dataStorage.loggedInUserData.talent_id};
    this.appSer.getAppliedGigs(requestObj).subscribe((res) => {
        this.appliedGigList = res['appliedGigs'];
    });
  }

  onAcceptOrRejectGigClick(item, flag) {
    var requestObj = {post_id: item.post_id, talent_id: localStorage.getItem('talent_id')};
    this.appSer.acceptOrRejectGig(requestObj, flag).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
        item.status = res['updated_status'];
        item.status_value = res['updated_status_value'];
      } else {
        this.toast.error(res['message'], "error");

      }
  });
    
  }

}
