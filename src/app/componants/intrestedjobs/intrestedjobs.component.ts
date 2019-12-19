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
  selector: 'app-intrestedjobs',
  templateUrl: './intrestedjobs.component.html',
  styleUrls: ['./intrestedjobs.component.scss'],
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
export class IntrestedjobsComponent implements OnInit {

  paginationIndex = 0;
  itemsPerPage = 5;
  interestedGigsList = [];

  constructor(private router: Router,private toast: ToastrService, private dataStorage: DataStorageService, private appSer: AppServiceService) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }
  ngOnInit() {
    window.scroll(0, 0);
    this.getInterestedGigs();
  }
 
  getInterestedGigs(){
    var requestObj = {
      talent_id: this.dataStorage.loggedInUserData.talent_id
    };
    this.appSer.getInterestedGigs(requestObj).subscribe((res) => {
        this.interestedGigsList = res['interestedGigs'];
    });
  }
}
