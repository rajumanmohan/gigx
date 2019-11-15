import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-companysubscriptions',
  templateUrl: './companysubscriptions.component.html',
  styleUrls: ['./companysubscriptions.component.scss']
})
export class CompanysubscriptionsComponent implements OnInit {

  constructor(public router: Router, private toast: ToastrService ) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
