import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../providers/pagesService/pager.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-token-request-list',
  templateUrl: './token-request-list.component.html',
  styleUrls: ['./token-request-list.component.scss']
})
export class TokenRequestListComponent implements OnInit {
  pager: any;
  pagedItems: any;
  requests;
  pages: any[];

  constructor(
    private serverApiService: ServerApiService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.serverApiService.getAllTokensReq().subscribe((data: {}) => {
      console.log(data);
      this.requests = data;
      this.setPage(1);
    });
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.requests.length, page);
    // get current page of items
    this.pagedItems = this.requests.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.pages = this.pager.pages;
  }
}
