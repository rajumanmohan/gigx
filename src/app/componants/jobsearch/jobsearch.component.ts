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
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.scss'],
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
export class JobsearchComponent implements OnInit {
  ShowListone = true;
  ShowListTwo = true;
  ShowListAll = true;
  countriesList =[];
  industriesList = [];
  skillsList = [];
  filteredJobsList = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  selectedSkills = [];
  selectedIndustries = [];
  selectedCountries = [];

  constructor(private router: Router,private toast: ToastrService, private appSer: AppServiceService, private dataStorage: DataStorageService) {

    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }
  ngOnInit() {
    window.scroll(0, 0);
    this.getAllMasterData();
  }
  clear1() {
    this.ShowListone = false;
  }
  clear2() {
    this.ShowListTwo = false;
  }
  clearall() {
    this.ShowListone = false;
    this.ShowListTwo = false;
    this.ShowListAll = false;
  }
  getAllMasterData(){
    this.appSer.getTalentSearchFilters().subscribe((res) => {
      this.countriesList = res['countriesList'];
      this.industriesList = res['industriesList'];
      this.skillsList = res['skillsList'];

      this.retainSearch();
  });
  }

  retainSearch(){
    if(this.dataStorage.globalSearchCriteria.isDataAvailable){
      this.selectedSkills = this.dataStorage.globalSearchCriteria.selectedSkills;
      this.selectedIndustries = this.dataStorage.globalSearchCriteria.selectedIndustries;
      this.selectedCountries = this.dataStorage.globalSearchCriteria.selectedCountries;

      this.selectedSkills.forEach(x=>{
        this.skillsList.filter(y=> {y.skill_id == x.skill_id ? y.checked = true : ''});
      });
      this.selectedIndustries.forEach(x=>{
        this.industriesList.filter(y=> {y.industry_id == x.industry_id ? y.checked = true : ''});
      });
      this.selectedCountries.forEach(x=>{
        this.countriesList.filter(y=> {y.country_id == x.country_id ? y.checked = true : ''});
      });
      

      this.onSearchClick();
    }

    this.dataStorage.globalSearchCriteria.isDataAvailable = false;
    this.dataStorage.globalSearchCriteria.selectedCountries = [];
    this.dataStorage.globalSearchCriteria.selectedIndustries = [];
    this.dataStorage.globalSearchCriteria.selectedSkills = [];
  }

  onSearchClick(){
    this.selectedCountries =  this.countriesList.filter(x=>x.checked);
    var selectedCountries = this.selectedCountries.map(x=>x.country_id).join(',');
    this.selectedIndustries =  this.industriesList.filter(x=>x.checked);
    var selectedIndustries =  this.selectedIndustries.map(x=>x.industry_id).join(',');
    this.selectedSkills =  this.skillsList.filter(x=>x.checked);
    var selectedSkills = this.selectedSkills.map(x=>x.skill_id).join(',');
    
    var requestObj = {
      selectedCountryIds: selectedCountries,
      selectedSkillIds: selectedIndustries,
      selectedIndustryTypeIds: selectedSkills
    };
    this.filteredJobsList =[];
    this.appSer.searchTalentResults(requestObj).subscribe((res) => {
      this.filteredJobsList = res['jobposts'];
  });
  }

  onPaginationDropdownChange(event){
     this.itemsPerPage = event.target.value;
  }

  onCountryChange(event){
    this.onSearchClick(); 
  }

  onIndustryChange(event){
    this.onSearchClick();
  }

  onSkillChange(event){
    this.onSearchClick();
  }

  onCountryRemoveClick(item){
    this.countriesList.filter(x=> {x.country_id == item.country_id ? x.checked = false : ''});
    this.onSearchClick();
  }

  onIndustryRemoveClick(item){
    this.industriesList.filter(x=> {x.industry_id == item.industry_id ? x.checked = false : ''});
    this.onSearchClick();
  }

  onSkillRemoveClick(item){
    this.skillsList.filter(x=> {x.skill_id == item.skill_id ? x.checked = false : ''});
    this.onSearchClick();
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

  onViewMoreDetailsClick(){
    this.dataStorage.globalSearchCriteria.selectedCountries = this.selectedCountries;
    this.dataStorage.globalSearchCriteria.selectedIndustries = this.selectedIndustries;
    this.dataStorage.globalSearchCriteria.selectedSkills = this.selectedSkills;
    this.dataStorage.globalSearchCriteria.isDataAvailable = true;
  }
}
