import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideFadeIn, slideFadeOut, useSlideFadeInAnimation, useSlideFadeOutAnimation } from '../../animations';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
  bounceInAndOut, enterAndLeaveFromLeft, enterAndLeaveFromRight, fadeInAndOut,
  fadeInThenOut, growInShrinkOut, swingInAndOut
} from '../../triggers';
import { AppServiceService } from 'src/app/Services/app-service.service';
import { DataStorageService } from 'src/app/Services/data-storage.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-latest-annoucements',
  templateUrl: './latest-annoucements.component.html',
  styleUrls: ['./latest-annoucements.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    growInShrinkOut, fadeInThenOut, swingInAndOut, fadeInAndOut,
    enterAndLeaveFromLeft, enterAndLeaveFromRight, bounceInAndOut,
    trigger('enterFromLeftLeaveToRight', [
      transition(':enter', useSlideFadeInAnimation('1000ms', '20px')),
      transition(':leave', useAnimation(slideFadeOut, { params: { time: '1000ms', endPos: '100px' } })),
    ]),
  ]
})
export class LatestAnnoucementsComponent implements OnInit {

  displayedColumns = ['id', 'title', 'description', 'status'];
  dataSource:MatTableDataSource<Element[]>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  latestAnnouncements = [];
  paginationIndex = 0;
  itemsPerPage = 5;
  constructor(private route: ActivatedRoute, private router: Router, private appSer: AppServiceService, private dataStorage: DataStorageService, private toast: ToastrService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.getAllLatestAnnoucements();
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  getAllLatestAnnoucements(){
    this.appSer.getAllLatestAnnouncemnts().subscribe((res) => {
      this.dataSource = res['latestAnnouncement'];
      this.dataSource.paginator = this.paginator;
    });
  }
}
