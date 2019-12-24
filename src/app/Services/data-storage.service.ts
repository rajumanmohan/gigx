import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public loggedInUserData: any = {};
  public globalRegistrationTypes = {'COMPANY': 'company', 'TALENT': 'talent'};
  public globalSearchCriteria = {selectedSkills: [], selectedIndustries: [], selectedCountries: [], isDataAvailable: false};
}
