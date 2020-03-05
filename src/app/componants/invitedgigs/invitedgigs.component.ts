import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { DataStorageService } from 'src/app/Services/data-storage.service';
import { AppServiceService } from 'src/app/Services/app-service.service';
@Component({
  selector: 'app-invitedgigs',
  templateUrl: './invitedgigs.component.html',
  styleUrls: ['./invitedgigs.component.scss'],
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
export class InvitedGigsComponent implements OnInit {

  paginationIndex = 0;
  itemsPerPage = 5;
  invitedGigsList = [];
  invitedGigsCount = 0;

  constructor(private router: Router,private toast: ToastrService, private dataStorage: DataStorageService, private appSer: AppServiceService) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }
  ngOnInit() {
    window.scroll(0, 0);
    this.getTalentInvitedGigs();
  }
 
  getTalentInvitedGigs(){
    var requestObj = {
      talent_id: this.dataStorage.loggedInUserData.talent_id
    };
    this.appSer.getTalentInvitedGigs(requestObj).subscribe((res) => {
        this.invitedGigsList = res['invitedGigs'];
        this.invitedGigsCount = res['invitedGigs'].length;
    });
  }

  onApplyGigClick(item){
    var requestObj = {
      'post_id': item.post_id,
      'talent_id': this.dataStorage.loggedInUserData.talent_id
    }
    this.appSer.applyGig(requestObj).subscribe((res) => {
      if (res['status'] == 200) {
        item.applied_status = true;
        this.toast.success(res['message'], "Success");
      } else {
        this.toast.error(res['message'], "Error");

      }
  }); 
  }
}
