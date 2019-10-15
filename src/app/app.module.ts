import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componants/home/home.component';
import { LoginComponent } from './componants/login/login.component';
import { CoverpageComponent } from './componants/coverpage/coverpage.component';
import { HeaderComponent } from './componants/header/header.component';
import { ChangepasswordComponent } from './componants/changepassword/changepassword.component';
import { CreateaccountComponent } from './componants/createaccount/createaccount.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { CompanyregistrationComponent } from './componants/companyregistration/companyregistration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CoverpageComponent,
    HeaderComponent,
    ChangepasswordComponent,
    CreateaccountComponent,
    ProfileComponent,
    CompanyregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
