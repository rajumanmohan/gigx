import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componants/home/home.component';
import { LoginComponent } from './componants/login/login.component';
import { CoverpageComponent } from './componants/coverpage/coverpage.component';
import { HeaderComponent } from './componants/header/header.component';
import { PaymentHistoryComponent } from './componants/payment-history/payment-history.component';
import { MatStepperModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangepasswordComponent } from './componants/changepassword/changepassword.component';
import { CreateaccountComponent } from './componants/createaccount/createaccount.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { CompanyregistrationComponent } from './componants/companyregistration/companyregistration.component';
import { TelentregistrationComponent } from './componants/telentregistration/telentregistration.component';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { PostagigComponent } from './componants/postagig/postagig.component';
import { TalentsearchComponent } from './componants/talentsearch/talentsearch.component';
import { TalentdetailsComponent } from './componants/talentdetails/talentdetails.component';
import { RatingsComponent } from './componants/ratings/ratings.component';
import { SubscriptionsComponent } from './componants/subscriptions/subscriptions.component';
import { PaymentComponent } from './componants/payment/payment.component';
import { JobsearchComponent } from './componants/jobsearch/jobsearch.component';
import { TalentprofileComponent } from './componants/talentprofile/talentprofile.component';
import { AppliedjobsComponent } from './componants/appliedjobs/appliedjobs.component';
import { IntrestedjobsComponent } from './componants/intrestedjobs/intrestedjobs.component';
import { CreateajobalertComponent } from './componants/createajobalert/createajobalert.component';
import { JobalertsComponent } from './componants/jobalerts/jobalerts.component';
import { TalentdashboardComponent } from './componants/talentdashboard/talentdashboard.component';

// import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CoverpageComponent,
    HeaderComponent,
    PaymentHistoryComponent,
    ChangepasswordComponent,
    CreateaccountComponent,
    ProfileComponent,
    CompanyregistrationComponent,
    TelentregistrationComponent,
    PostagigComponent,
    TalentsearchComponent,
    TalentdetailsComponent,
    RatingsComponent,
    SubscriptionsComponent,
    PaymentComponent,
    JobsearchComponent,
    TalentprofileComponent,
    AppliedjobsComponent,
    IntrestedjobsComponent,
    CreateajobalertComponent,
    JobalertsComponent,
    TalentdashboardComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatIconModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    FormsModule
  ],
  providers: [
    //   {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    //   } as RecaptchaSettings,
    // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
