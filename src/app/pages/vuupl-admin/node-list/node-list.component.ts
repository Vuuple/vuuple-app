import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { PagerService } from '../../../providers/pagesService/pager.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent implements OnInit {
  TotalCompanyRenter="15";
  nodes : any = [];
  pager: any;
  pagedItems: any;
  pages: { totalItems: number; currentPage: number; pageSize: number; totalPages: number; startPage: number; endPage: number; startIndex: number; endIndex: number; pages: number[]; };
  constructor(private serverApiService : ServerApiService,private pagerService : PagerService) {
    this.TotalCompanyRenter;
    this.serverApiService.getAllUsers().subscribe( (data : {}) => {
      console.log (data);
      this.nodes = data ;
      this.setPage(1);
    });
   }
  ngOnInit() {
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.nodes.length, page);
    // get current page of items
    this.pagedItems = this.nodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pages = this.pager.pages;

}

}
