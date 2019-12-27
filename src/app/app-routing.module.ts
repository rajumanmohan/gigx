import { IndividualRegistrationsComponent } from './componants/individual-registrations/individual-registrations.component';
import { RegistrationDataComponent } from './componants/registration-data/registration-data.component';
import { TakeatestComponent } from './componants/takeatest/takeatest.component';
import { TalentdashboardComponent } from './componants/talentdashboard/talentdashboard.component';
import { CompanydashboardComponent } from './componants/companydashboard/companydashboard.component';
import { GetstartedComponent } from './componants/getstarted/getstarted.component';
import { JobalertsComponent } from './componants/jobalerts/jobalerts.component';
import { CreateajobalertComponent } from './componants/createajobalert/createajobalert.component';
import { IntrestedjobsComponent } from './componants/intrestedjobs/intrestedjobs.component';
import { AppliedjobsComponent } from './componants/appliedjobs/appliedjobs.component';
import { TalentprofileComponent } from './componants/talentprofile/talentprofile.component';
import { JobsearchComponent } from './componants/jobsearch/jobsearch.component';
import { TelentregistrationComponent } from './componants/telentregistration/telentregistration.component';
import { PaymentComponent } from './componants/payment/payment.component';
import { SubscriptionsComponent } from './componants/subscriptions/subscriptions.component';
import { RatingsComponent } from './componants/ratings/ratings.component';
import { TalentdetailsComponent } from './componants/talentdetails/talentdetails.component';
import { TalentsearchComponent } from './componants/talentsearch/talentsearch.component';
import { PostagigComponent } from './componants/postagig/postagig.component';
import { PaymentHistoryComponent } from './componants/payment-history/payment-history.component';
import { CompanyregistrationComponent } from './componants/companyregistration/companyregistration.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { CreateaccountComponent } from './componants/createaccount/createaccount.component';
import { ChangepasswordComponent } from './componants/changepassword/changepassword.component';
import { HeaderComponent } from './componants/header/header.component';
import { CoverpageComponent } from './componants/coverpage/coverpage.component';
import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { NgModule } from '@angular/core';
import { AboutusComponent } from './componants/aboutus/aboutus.component';
import { ContactComponent } from './componants/contact/contact.component';
import { TestlistComponent } from './componants/testlist/testlist.component';
import { ViewgigComponent } from './componants/viewgig/viewgig.component';
import { ViewpostedgigsComponent } from './componants/viewpostedgigs/viewpostedgigs.component';
import { PostedgigdetailsComponent } from './componants/postedgigdetails/postedgigdetails.component';
import { Routes, RouterModule } from '@angular/router';
import { TalentProfilesListComponent } from './componants/talentprofileslist/talentprofileslist.component';
import { TalentProfileDetailsComponent } from './componants/talentprofiledetails/talentprofiledetails.component';
import { AppliedProfilesListComponent } from './componants/appliedprofileslist/appliedprofileslist.component';
import { ShortlistedProfilesListComponent } from './componants/shortlistedprofileslist/shortlistedprofileslist.component';
import { AcceptedProfilesListComponent } from './componants/acceptedprofileslist/acceptedprofileslist.component';
import { RejectedProfilesListComponent } from './componants/rejectedprofileslist/rejectedprofileslist.component';
import { InvitedGigsComponent } from './componants/invitedgigs/invitedgigs.component';
import { PaymentSuccessComponent } from './componants/payment-sucess/payment-sucess.component';
import { PaymentFailureComponent } from './componants/payment-failure/payment-failure.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HeaderComponent
  // },
  {
    path: 'coverpage',
    component: CoverpageComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutusComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'paymentHistory',
    component: PaymentHistoryComponent
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'createaccount',
    component: CreateaccountComponent
  },
  {
    path: 'companyprofile',
    component: ProfileComponent
  },
  {
    path: 'companyregistration',
    component: CompanyregistrationComponent
  },
  {
    path: 'talentregistration',
    component: TelentregistrationComponent
  },
  {
    path: 'postagig',
    component: PostagigComponent
  },
  {
    path: 'viewgig/:postId/:flag',
    component: ViewgigComponent
  },
  {
    path: 'talentsearch',
    component: TalentsearchComponent
  },
  {
    path: 'talentprofile',
    component: TalentdetailsComponent
  },
  {
    path: 'ratingsreview',
    component: RatingsComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'jobsearch',
    component: JobsearchComponent
  },
  {
    path: 'talentedit',
    component: TalentprofileComponent

  },
  {
    path: 'appliedjobs',
    component: AppliedjobsComponent

  },
  {
    path: 'intrestedjobs',
    component: IntrestedjobsComponent

  },
  {
    path: 'createajobalert',
    component: CreateajobalertComponent

  },
  {
    path: 'jobalerts',
    component: JobalertsComponent

  },
  {
    path: 'getstarted',
    component: GetstartedComponent

  },
  {
    path: 'companydashboard',
    component: CompanydashboardComponent
  },
  {
    path: 'talentdashboard',
    component: TalentdashboardComponent

  },
  {
    path: 'takeatest',
    component: TakeatestComponent

  },
  {
    path: 'companyRegistrations',
    component: RegistrationDataComponent

  },
  {
    path: 'individualRegistrations',
    component: IndividualRegistrationsComponent

  },
  {
    path: 'testlist',
    component: TestlistComponent
  },
  {
    path: 'viewpostedgigs',
    component: ViewpostedgigsComponent

  },
  {
    path: 'postedgigdetails/:postId',
    component: PostedgigdetailsComponent
  },
  {
    path: 'companytalentprofileslist/:postId',
    component: TalentProfilesListComponent
  },
  {
    path: 'profiledetails/:postId/:talentId/:flag',
    component: TalentProfileDetailsComponent
  },
  {
    path: 'appliedprofileslist/:postId',
    component: AppliedProfilesListComponent
  },
  {
    path: 'shortlistedprofileslist/:postId',
    component: ShortlistedProfilesListComponent
  },
  {
    path: 'acceptedprofileslist/:postId',
    component: AcceptedProfilesListComponent
  },
  {
    path: 'rejectedprofileslist/:postId',
    component: RejectedProfilesListComponent
  },
  {
    path: 'invitedgigs',
    component: InvitedGigsComponent
  },
  {
    path: 'payment_success',
    component: PaymentSuccessComponent
  },
  {
    path: 'payment_failure',
    component: PaymentFailureComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
