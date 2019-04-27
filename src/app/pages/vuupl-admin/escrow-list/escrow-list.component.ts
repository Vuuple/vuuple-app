import { ServerApiService } from './../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagerService } from '../../../providers/pagesService/pager.service';

@Component({
  selector: 'app-escrow-list',
  templateUrl: './escrow-list.component.html',
  styleUrls: ['./escrow-list.component.scss']
})
export class EscrowListComponent implements OnInit {
  escrows: any = [];
  id = '5cab6b97bcadab30f8b60976';
  saddress: any;
  pager: any;
  pagedItems: any;
  pages: any[];
  constructor(
    private router: Router,
    private apiService: ServerApiService,
    private pagerService: PagerService
  ) {}
  ngOnInit() {
    this.apiService.getAllEscrows().subscribe(s => {
      this.escrows = s;
      this.setPage(1);
      console.log(this.escrows);
    });
    // console.log(this.id);
    // this.apiService.getEscrowsByUserId(this.id).subscribe(data => {
    //   this.escrows = data;
    //   console.log(this.escrows);
    // })
  }
  goToDetails(selectedescrow, _category) {
    console.log(selectedescrow, 'selectedescrow');
    console.log(_category, '_category');

    this.router.navigate(['/pages/admin/escrowDetails'], {
      queryParams: { address: selectedescrow, category: _category }
    });
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.escrows.length, page);
    // get current page of items
    this.pagedItems = this.escrows.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.pages = this.pager.pages;
  }
}
