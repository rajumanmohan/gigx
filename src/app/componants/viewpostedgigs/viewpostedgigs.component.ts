import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { DataStorageService } from 'src/app/Services/data-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewpostedgigs',
  templateUrl: './viewpostedgigs.component.html',
  styleUrls: ['./viewpostedgigs.component.scss'],
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
export class ViewpostedgigsComponent implements OnInit {

  postedGigList = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  filtroString;
  constructor(private route: ActivatedRoute, private router: Router, private appSer: AppServiceService, private dataStorage: DataStorageService, private toast: ToastrService) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(!this.dataStorage.loggedInUserData.industry_type){
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
      return false;
    }
    else{
      this.getAllPostedGigs();
    }

  }
  gotogigdetails() {
    this.router.navigate(['/postedgigdetails'])
  }

  getAllPostedGigs(){
    var requestObj = {
      'company_id': this.dataStorage.loggedInUserData.company_id
    };
    this.appSer.getCompanyPostsForCompany(requestObj).subscribe((res) => {
      this.postedGigList = res['jobposts'];
    });
  }
}
