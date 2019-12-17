import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';
import { ToastrService } from 'ngx-toastr';
import { DataStorageService } from 'src/app/Services/data-storage.service';

@Component({
  selector: 'app-viewgig',
  templateUrl: './viewgig.component.html',
  styleUrls: ['./viewgig.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewgigComponent implements OnInit {

  postId;
  flag;
  companyPostDetails = {};
  constructor(public route: ActivatedRoute, private appSer: AppServiceService,private toast: ToastrService, private dataStorage: DataStorageService, private router: Router) { 
    this.postId = route.snapshot.params.postId;
    this.flag = route.snapshot.params.flag;
  }

  ngOnInit() {
    window.scroll(0, 0);
    if (!this.dataStorage.loggedInUserData.industry_type) {
      this.toast.warning('Please Login', "warning");
      this.router.navigate(['/coverpage']);
    } else {
      this.getCompanyPostDetailsByPostId();
    }
    
  }

  getCompanyPostDetailsByPostId(){
    this.appSer.getCompanyPostDetailsByPostId(this.postId).subscribe((res) => {
        this.companyPostDetails = res['jobpostsdetails'][0];
    });
  }

  getSplitResultValue(value, index){
    return value ? value.split(' ')[index] : '';
  }

  onApplyGigClick(){
    var requestObj = {
      'post_id': this.postId,
      'talent_id': this.dataStorage.loggedInUserData.talent_id
    }
    this.appSer.applyGig(requestObj).subscribe((res) => {
      if (res['status'] == 200) {
        this.toast.success(res['message'], "success");
      } else {
        this.toast.error(res['message'], "error");

      }
  }); 
  }

}
