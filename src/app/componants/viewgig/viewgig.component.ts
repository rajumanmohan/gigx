import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from './../../Services/app-service.service';

@Component({
  selector: 'app-viewgig',
  templateUrl: './viewgig.component.html',
  styleUrls: ['./viewgig.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewgigComponent implements OnInit {

  postId;
  companyPostDetails = {};
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
