import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-postedgigdetails',
  templateUrl: './postedgigdetails.component.html',
  styleUrls: ['./postedgigdetails.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostedgigdetailsComponent implements OnInit {
  postId;
  companyPostDetails;
  constructor(public route: ActivatedRoute, private appSer: AppServiceService) {
    this.postId = route.snapshot.params.postId;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getCompanyPostDetailsByPostId();
  }

  getCompanyPostDetailsByPostId(){
    this.appSer.getCompanyPostDetailsByPostId(this.postId).subscribe((res) => {
        this.companyPostDetails = res['jobpostsdetails'][0];
    });
  }

  getSplitResultValue(value, index){
    return value ? value.split(' ')[index] : '';
  }

}
