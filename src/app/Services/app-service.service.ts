import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  apiUrl = "https://gigxglobal.com/api/"

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
  getindividualData() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getRegisteredIndividuals.php', { headers })
  }
  registrationTalent(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_registration.php', params, { headers })
  }
  loginTalentApi(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_login.php', params, { headers })
  }
  loginCompanyApi(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_login.php', params, { headers })
  }
  updateTalentPassword(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_changepassword.php', params, { headers })
  }
  updateCompanyPassword(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_changepassword.php', params, { headers })
  }
  forgotPassword(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'forgotpassword.php', params, { headers })
  }
  CompanyProfile(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_profile.php', params, { headers })
  }
  TalentProfile(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_profile.php', params, { headers })
  }
  CompanyEditProfile(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_edit_profile.php', params, { headers })
  }
  talentEditEducation(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_edit_profile.php', params, { headers })
  }
  addBankDetails(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_edit_profile.php', params, { headers })
  }
  talentEditJob(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_edit_profile.php', params, { headers })
  }
  countriesList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'countries.php', { headers })
  }
  getIndustryList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getIndustries.php', { headers })
  }
  getRoles() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getRoles.php ', { headers })
  }
  statesList(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'states.php', params, { headers })
  }
  citiesList(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'cities.php', params, { headers })
  }
  deleteEducation(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_delete_educational_details.php', params, { headers })
  }
  deleteExperiance(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'talent_delete_job_details.php', params, { headers })
  }
  getHighestQualicationList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getHighestQualifications.php', { headers })
  }
  getInstitutionsList(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'getUniversitiesByCountry.php', params, { headers })
  }
  getIndustryTypeList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getIndustries.php', { headers })
  }
  getRoleList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getRoles.php', { headers })
  }

  getSkillList() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getSkills.php', { headers })
  }

  postCreateGigAlert(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'create_gig_alert.php', params, { headers })
  }

  postAGig(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_post_gig.php', params, { headers })
  }

  getAllBatteries() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getAllBatteries.php', { headers })
  }

  startCandidateAssessment(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'candidateInvite.php', params, { headers })
  }

  getCompletedAssessmentDetails(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'getAssessmentDetails.php', params, { headers })
  }

  getAssessmentReport(trackingNumber) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getAssessmentReport.php?tracking_number=' + trackingNumber, { headers })
  }

  resumeAssessment(trackingNumber) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'candidateRestartTest.php?tracking_number=' + trackingNumber, { headers })
  }

  getCompanyPostsForTalent(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'getCompanyPostsByTalentSkills.php', params, { headers })
  }

  getCompanyPostDetailsByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getDetailsByPostId.php?post_id=' + postId, { headers })
  }

  getCompanyPostsForCompany(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'viewCompanyPosts.php', params, { headers })
  }

  applyGig(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'applyGig.php', params, { headers })
  }

  getTalentProfilesByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getTalentProfilesByPostId.php?post_id=' + postId, { headers })
  }

  getAppliedGigs(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'viewAppliedGigs.php', params, { headers })
  }

  getInterestedGigs(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'viewInterestedGigs.php', params, { headers })
  }

  setInterestedGig(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'setInterestedGig.php', params, { headers })
  }

  deleteInterestedGig(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'deleteInterestedGig.php', params, { headers })
  }

  getAppliedTalentProfilesByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getAppliedTalentProfilesByPostId.php?post_id=' + postId, { headers })
  }

  shortlistTalentByPostId(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'shortlistTalentByPostId.php', params, { headers })
  }

  getShortlistedTalentProfilesByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getShortlistedTalentProfilesByPostId.php?post_id=' + postId, { headers })
  }

  acceptTalentByPostId(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'acceptTalentByPostId.php', params, { headers })
  }
  rejectTalentByPostId(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'rejectTalentByPostId.php', params, { headers })
  }
  getAcceptedTalentProfilesByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getAcceptedTalentProfilesByPostId.php?post_id=' + postId, { headers })
  }
  getRejectedTalentProfilesByPostId(postId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'getRejectedTalentProfilesByPostId.php?post_id=' + postId, { headers })
  }
  inviteTalentByPostId(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'inviteTalentByPostId.php', params, { headers })
  }
  getTalentInvitedGigs(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'getTalentInvitedGigs.php', params, { headers })
  }
  getTalentSearchFilters() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'talentSearchFilters.php', { headers })
  }
  searchTalentResults(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'searchTalentResults.php', params, { headers })
  }

  getCompanySubscriptions(companyId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'company_subscription_plans.php?company_id=' +companyId, { headers })
  }
  getCompanySearchFilters() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.get(this.apiUrl + 'companySearchFilters.php', { headers })
  }
  searchCompanyResults(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'searchCompanyResults.php', params, { headers })
  }
  getCompanyDashboard(params) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_dashboard.php', params, { headers })
  }

  getCompanyDashboardInfo(params){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'company_dashboard.php', params,  { headers }) 
  }

  companySubscribe(params){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'companySubscribe.php', params,  { headers }) 
  }

  updatePaymentStatus(params){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/JSON');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return this.httpClient.post(this.apiUrl + 'updatePaymentStatus.php', params,  { headers }) 
  }
}

