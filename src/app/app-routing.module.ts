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
import { Routes, RouterModule } from '@angular/router';
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
    path: 'profile',
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
    path: 'talentaccount',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
