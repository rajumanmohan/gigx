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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
