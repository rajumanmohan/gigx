
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { NgxPaginationModule } from 'ngx-pagination';

import { NgSelectModule } from '@ng-select/ng-select';
import { Pipe, PipeTransform } from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TypeaheadModule } from 'ngx-type-ahead';

import { PipesModule } from 'w-ng5';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './componants/home/home.component';
import { LoginComponent } from './componants/login/login.component';
import { CoverpageComponent } from './componants/coverpage/coverpage.component';
import { HeaderComponent } from './componants/header/header.component';
import { PaymentHistoryComponent } from './componants/payment-history/payment-history.component';
import { ChangepasswordComponent } from './componants/changepassword/changepassword.component';
import { CreateaccountComponent } from './componants/createaccount/createaccount.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { CompanyregistrationComponent } from './componants/companyregistration/companyregistration.component';
import { TelentregistrationComponent } from './componants/telentregistration/telentregistration.component';
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
import { GetstartedComponent } from './componants/getstarted/getstarted.component';
import { CompanydashboardComponent } from './componants/companydashboard/companydashboard.component';
import { TakeatestComponent } from './componants/takeatest/takeatest.component';
import { NumberOnlyDirective } from './directives/number';
import { RegistrationDataComponent } from './componants/registration-data/registration-data.component';
import { CompanysubscriptionsComponent } from './componants/companysubscriptions/companysubscriptions.component';
import { IndividualRegistrationsComponent } from './componants/individual-registrations/individual-registrations.component';
import { AboutusComponent } from './componants/aboutus/aboutus.component';
import { ContactComponent } from './componants/contact/contact.component';
import { TestlistComponent } from './componants/testlist/testlist.component';
import { ViewgigComponent } from './componants/viewgig/viewgig.component';
import { ViewpostedgigsComponent } from './componants/viewpostedgigs/viewpostedgigs.component';
import { PostedgigdetailsComponent } from './componants/postedgigdetails/postedgigdetails.component';
import { TalentProfilesListComponent } from './componants/talentprofileslist/talentprofileslist.component';
import { TalentProfileDetailsComponent } from './componants/talentprofiledetails/talentprofiledetails.component';
import { AppliedProfilesListComponent } from './componants/appliedprofileslist/appliedprofileslist.component';
import { ShortlistedProfilesListComponent } from './componants/shortlistedprofileslist/shortlistedprofileslist.component';
import { AcceptedProfilesListComponent } from './componants/acceptedprofileslist/acceptedprofileslist.component';
import { RejectedProfilesListComponent } from './componants/rejectedprofileslist/rejectedprofileslist.component';
import { InvitedGigsComponent } from './componants/invitedgigs/invitedgigs.component';
<<<<<<< HEAD
import { PaymentSuccessComponent } from './componants/payment-sucess/payment-sucess.component';
import { PaymentFailureComponent } from './componants/payment-failure/payment-failure.component';
=======
import { TermsconditionsComponent } from './componants/termsconditions/termsconditions.component';
>>>>>>> 42388fe0948a79028fa0f514d407c97ff6c01486


@Pipe({ name: 'safe' })
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
    PaymentComponent,
    GetstartedComponent,
    CompanydashboardComponent,
    TakeatestComponent,
    NumberOnlyDirective,
    RegistrationDataComponent,
    IndividualRegistrationsComponent,
    CompanysubscriptionsComponent,
    AboutusComponent,
    ContactComponent,
    TestlistComponent,
    ViewgigComponent,
    ViewpostedgigsComponent,
    PostedgigdetailsComponent,
    TalentProfilesListComponent,
    TalentProfileDetailsComponent,
    AppliedProfilesListComponent,
    ShortlistedProfilesListComponent,
    AcceptedProfilesListComponent,
    RejectedProfilesListComponent,
    InvitedGigsComponent,
<<<<<<< HEAD
    PaymentSuccessComponent,
    PaymentFailureComponent
=======
    TermsconditionsComponent
>>>>>>> 42388fe0948a79028fa0f514d407c97ff6c01486
  ],
  imports: [
    AutocompleteLibModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatIconModule,
    BrowserAnimationsModule,
    MyDatePickerModule,
    TypeaheadModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      } as RecaptchaSettings,
    },
    ToastrService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
