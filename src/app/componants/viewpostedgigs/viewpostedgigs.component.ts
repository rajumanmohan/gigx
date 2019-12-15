import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewpostedgigs',
  templateUrl: './viewpostedgigs.component.html',
  styleUrls: ['./viewpostedgigs.component.scss']
})
export class ViewpostedgigsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }
  gotogigdetails() {
    this.router.navigate(['/postedgigdetails'])
  }
}
