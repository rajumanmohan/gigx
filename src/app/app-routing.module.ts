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
    path: '',
    component: CoverpageComponent
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
