import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-talentdetails',
  templateUrl: './talentdetails.component.html',
  styleUrls: ['./talentdetails.component.scss']
})
export class TalentdetailsComponent implements OnInit {

  constructor(private router: Router, private toast: ToastrService) {
    if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
    }
   }

  ngOnInit() {
    window.scroll(0,0);
  }

}
