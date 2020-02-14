import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from './../../Services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public dataStorage: DataStorageService) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  logout() {
    // this.router.navigate(['/coverpage']);
    this.router.navigate(['/']);
    localStorage.clear();
    this.dataStorage.loggedInUserData = {};
  }

  onMyProfileClick(){
    if(this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.COMPANY){
      //this.router.navigate(['/companydashboard']);
      if (this.dataStorage.loggedInUserData.industry_type == 'company') {
        this.router.navigate(['/companyprofile'], { queryParams: { page: 'company' } });
      }
      else if (this.dataStorage.loggedInUserData.industry_type == 'individual') {
        this.router.navigate(['/companyprofile'], { queryParams: { page: 'individual' } });
      }
    }
    else if(this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.TALENT){
      this.router.navigate(['/talentedit']);
    }
  }
}
 