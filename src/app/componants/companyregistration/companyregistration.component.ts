import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyregistration',
  templateUrl: './companyregistration.component.html',
  styleUrls: ['./companyregistration.component.scss']
})
export class CompanyregistrationComponent implements OnInit {
  strImage;
  url1;
  indType;
  comType;
  constructor() { }

  ngOnInit() {
    this.comType = 'company';
  }
  image;
  readUrl(event: any) {
    console.log('readUrl');
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url1 = event.target.result;
        console.log(this.url1)
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  changeType(type) {
    this.comType = type.target.value;
  }

}
