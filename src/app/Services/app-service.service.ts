import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  apiUrl = "http://gigxglobal.com/api/"

  constructor(private httpClient: HttpClient) { }
  registration(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_registration.php', params, { headers })
  }
  getCompanyData() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getRegisteredCompanies.php', { headers })
  }
}
