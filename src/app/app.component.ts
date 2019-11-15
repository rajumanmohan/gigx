import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'gigx-app';
  constructor(private router: Router, private toast: ToastrService) {
    // if (localStorage.industry_type === '' || localStorage.industry_type === undefined || localStorage.industry_type === null) {
    //   this.toast.warning('Please Login', "warning");
    //   this.router.navigate(['coverpage']);
    // } else {
    // }

  }

}
