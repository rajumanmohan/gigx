import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-postagig',
  templateUrl: './postagig.component.html',
  styleUrls: ['./postagig.component.scss']
})
export class PostagigComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
