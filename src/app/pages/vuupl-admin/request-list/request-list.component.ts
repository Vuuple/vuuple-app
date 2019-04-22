import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PagerService } from '../../../providers/pagesService/pager.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests: any = [];
  requestss: any = [];
  pager: any;
  pagedItems: any;
  constructor(
    private serverApiService: ServerApiService,
    private router: Router,
    private pagerService: PagerService
  ) {
    this.requests = [];
    this.serverApiService.getAllRequests().subscribe((data: {}) => {
      console.log(data);
      this.requests = data;
      this.setPage(1);
    });
  }

  addNode(id) {
    this.router.navigate(['/pages/admin/addNode'], { queryParams: { id: id } });
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.requests.length, page);

    // get current page of items
    this.pagedItems = this.requests.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
 
  ngOnInit() {}
}
