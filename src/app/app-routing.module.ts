import { PaymentHistoryComponent } from './componants/payment-history/payment-history.component';
import { CoverpageComponent } from './componants/coverpage/coverpage.component';

import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
