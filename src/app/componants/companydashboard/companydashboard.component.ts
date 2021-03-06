import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from './../../Services/app-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
@Component({
  selector: 'app-companydashboard',
  templateUrl: './companydashboard.component.html',
  styleUrls: ['./companydashboard.component.scss'],
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class CompanydashboardComponent implements OnInit {
  talentId; companyId; loginType;
  dashboardInfo;
  upcomingMilestores = [];
  // displayedColumns = ['id', 'title', 'description', 'status'];
  // dataSource:MatTableDataSource<Element[]>;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private router: Router, private appSer: AppServiceService, private toast: ToastrService, private formBuilder: FormBuilder) {
    this.talentId = localStorage.getItem('talent_id');
    this.companyId = localStorage.getItem('company_id');
    this.loginType = localStorage.getItem('industry_type');
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getCompanyProfile();
    this.getCompanyDashboardInfo();
    this.getUpcomingMilestonesByCompany();
  }
  gotoProfile() {
    if (this.loginType == 'company') {
      this.router.navigate(['/companyprofile'], { queryParams: { page: 'company' } });
    }
    else if (this.loginType == 'individual') {
      this.router.navigate(['/companyprofile'], { queryParams: { page: 'individual' } });
    }
  }
  profileDetails; profilename; companyName;
  getCompanyProfile() {
    let params = {
      company_type: this.loginType,
      company_id: this.companyId
    }
    this.appSer.CompanyProfile(params).subscribe((res) => {
      this.profileDetails = res['data'];
      if (this.loginType == 'company') {
        this.profilename = res['data'].company_name.substring(0, 2);
        this.companyName = res['data'].company_name;
      }
      else if (this.loginType == 'individual') {
        this.profilename = res['data'].contact_person.substring(0, 2);
        this.companyName = res['data'].contact_person;
      }
    })
  }
  logout() {
    this.router.navigate(['/coverpage']);
    localStorage.clear();
    this.toast.success('You have Signed Out Successfully', "success");
  }

  getCompanyDashboardInfo(){
    var requestObj = { company_id: this.companyId};
    this.appSer.getCompanyDashboardInfo(requestObj).subscribe((res) => {
      this.dashboardInfo = res['companyDashboardCounts'];
    })
  }

  getUpcomingMilestonesByCompany(){
    var requestObj = { company_id: this.companyId};
    this.appSer.getUpcomingMilestonesByCompany(requestObj).subscribe((res) => {
      this.upcomingMilestores = res['milestones'];
    })
  }
}
