import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataStorageService } from './Services/data-storage.service';
import { Router, NavigationStart, Event, RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'gigx-app';
  constructor(private router: Router, private toast: ToastrService, private dataStorage: DataStorageService, private route: Router) {
    // if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
    //   this.toast.warning('Please Login', "warning");
    //   this.router.navigate(['coverpage']);
    // } else {
    // }
    this.dataStorage.loggedInUserData = localStorage;

    this.route.events.subscribe((event: Event) => {
       if (event instanceof NavigationEnd) {

        if(event.url.indexOf('/coverpage') > -1 
        || event.url.indexOf('/login') > -1 
        || event.url.indexOf('/createaccount') > -1
        || event.url.indexOf('//getstarted') > -1
        || event.url.indexOf('/talentregistration') > -1
        || event.url.indexOf('/companyregistration') > -1
        ) {
          localStorage.clear();
          this.dataStorage.loggedInUserData = {};
        }
      
        if(this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.COMPANY){
         if(event.url.indexOf('/viewgig') > -1
         || event.url.indexOf('/talentdashboard') > -1
         || event.url.indexOf('/jobsearch') > -1
         || event.url.indexOf('/appliedjobs') > -1
         || event.url.indexOf('/talentprofile') > -1
         || event.url.indexOf('/intrestedjobs') > -1
         || event.url.indexOf('/createajobalert') > -1 
         || event.url.indexOf('/jobalerts') > -1 
         || event.url.indexOf('/takeatest') > -1 
         || event.url.indexOf('/testlist') > -1 
         ) {
          this.route.navigate(['/companydashboard']);
         }
        }
        else if(this.dataStorage.loggedInUserData.registration_type == this.dataStorage.globalRegistrationTypes.TALENT){
          if(event.url.indexOf('/companyprofile') > -1
          || event.url.indexOf('/companydashboard') > -1
          || event.url.indexOf('/postagig') > -1 
          || event.url.indexOf('/talentsearch') > -1 
          || event.url.indexOf('/ratingsreview') > -1 
          ) {
            this.route.navigate(['/talentdashboard']);
          }
        }

        
        //localStorage.clear();
        //this.route.navigate(['/pricing']);
        
      }
    });
  }

}
