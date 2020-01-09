import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-talentsearch',
  templateUrl: './talentsearch.component.html',
  styleUrls: ['./talentsearch.component.scss'],
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
export class TalentsearchComponent implements OnInit {
  ShowSearchScreen = true;
  ShowMyHiresScreen = false;
  ShowSavedScreen = false;
  countriesList = [];
  industriesList = [];
  skillsList = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  selectedSkills = [];
  selectedIndustries = [];
  selectedCountries = [];
  filteredTalentList = [];
  postedGigList = [];

  constructor(private router: Router, private toast: ToastrService, private appSer: AppServiceService, private dataStorage: DataStorageService) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }
  ngOnInit() {
    window.scroll(0, 0);
    this.getAllMasterData();
    this.getAllPostedGigs();
  }
  search() {
    this.ShowSearchScreen = true;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = false;
  }

  myhires() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = true;
    this.ShowSavedScreen = false;
  }

  saved() {
    this.ShowSearchScreen = false;
    this.ShowMyHiresScreen = false;
    this.ShowSavedScreen = true;
  }
  viewgig() {
    this.router.navigate(['/viewgig']);
  }

  getAllMasterData() {
    this.appSer.getCompanySearchFilters().subscribe((res) => {
      this.countriesList = res['countriesList'];
      this.industriesList = res['industriesList'];
      this.skillsList = res['skillsList'];

      this.retainSearch();
    });
  }

  onSearchClick() {
    this.selectedCountries = this.countriesList.filter(x => x.checked);
    var selectedCountries = this.selectedCountries.map(x => x.country_id).join(',');
    this.selectedIndustries = this.industriesList.filter(x => x.checked);
    var selectedIndustries = this.selectedIndustries.map(x => x.industry_id).join(',');
    this.selectedSkills = this.skillsList.filter(x => x.checked);
    var selectedSkills = this.selectedSkills.map(x => x.skill_id).join(',');

    var requestObj = {
      selectedCountryIds: selectedCountries,
      selectedSkillIds: selectedIndustries,
      selectedIndustryTypeIds: selectedSkills
    };
    this.filteredTalentList = [];
    console.log(requestObj)
    this.appSer.searchCompanyResults(requestObj).subscribe((res) => {
      this.filteredTalentList = res['talentProfiles'];
    });
  }

  retainSearch() {
    if (this.dataStorage.globalSearchCriteria.isDataAvailable) {
      this.selectedSkills = this.dataStorage.globalSearchCriteria.selectedSkills;
      this.selectedIndustries = this.dataStorage.globalSearchCriteria.selectedIndustries;
      this.selectedCountries = this.dataStorage.globalSearchCriteria.selectedCountries;

      this.selectedSkills.forEach(x => {
        this.skillsList.filter(y => { y.skill_id == x.skill_id ? y.checked = true : '' });
      });
      this.selectedIndustries.forEach(x => {
        this.industriesList.filter(y => { y.industry_id == x.industry_id ? y.checked = true : '' });
      });
      this.selectedCountries.forEach(x => {
        this.countriesList.filter(y => { y.country_id == x.country_id ? y.checked = true : '' });
      });


      this.onSearchClick();
    }

    this.dataStorage.globalSearchCriteria.isDataAvailable = false;
    this.dataStorage.globalSearchCriteria.selectedCountries = [];
    this.dataStorage.globalSearchCriteria.selectedIndustries = [];
    this.dataStorage.globalSearchCriteria.selectedSkills = [];
  }

  onPaginationDropdownChange(event) {
    this.itemsPerPage = event.target.value;
  }

  onCountryChange(event) {
    this.onSearchClick();
  }

  onIndustryChange(event) {
    this.onSearchClick();
  }

  onSkillChange(event) {
    this.onSearchClick();
  }

  onCountryRemoveClick(item) {
    this.countriesList.filter(x => { x.country_id == item.country_id ? x.checked = false : '' });
    this.onSearchClick();
  }

  onIndustryRemoveClick(item) {
    this.industriesList.filter(x => { x.industry_id == item.industry_id ? x.checked = false : '' });
    this.onSearchClick();
  }

  onSkillRemoveClick(item) {
    this.skillsList.filter(x => { x.skill_id == item.skill_id ? x.checked = false : '' });
    this.onSearchClick();
  }

  getAllPostedGigs() {
    var requestObj = {
      'company_id': this.dataStorage.loggedInUserData.company_id
    };
    this.appSer.getCompanyPostsForCompany(requestObj).subscribe((res) => {
      this.postedGigList = res['jobposts'];
    });
  }

  onInviteClick(item) {
    if (!item.post_id) {
      this.toast.error('Select Gig to continue', "Error");
      return false;
    }
    var requestObj = { post_id: item.post_id, talent_id: item.talent_id }
    this.appSer.inviteTalentByPostId(requestObj).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "Success");
        item.isInviteClicked = !item.isInviteClicked;
      } else {
        this.toast.error(res['message'], "Error");
      }
    });
  }

  onViewMoreDetailsClick() {
    this.dataStorage.globalSearchCriteria.selectedCountries = this.selectedCountries;
    this.dataStorage.globalSearchCriteria.selectedIndustries = this.selectedIndustries;
    this.dataStorage.globalSearchCriteria.selectedSkills = this.selectedSkills;
    this.dataStorage.globalSearchCriteria.isDataAvailable = true;
  }

}
