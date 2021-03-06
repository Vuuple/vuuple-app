import { ServerApiService } from './../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../../providers/pagesService/pager.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-escrow-list',
  templateUrl: './escrow-list.component.html',
  styleUrls: ['./escrow-list.component.scss']
})
export class EscrowListComponent implements OnInit {
  escrows: any = [];
  id;
  saddress: any;
  pager: any;
  pagedItems: any;
  pages: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiService: ServerApiService,
    private pagerService: PagerService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id, ' this.id');

      if (this.id != undefined && this.id != null) {
        console.log(this.id);
        this.spinner.show();
        this.apiService.getEscrowsByUserId(this.id).subscribe((data: any[]) => {
          this.spinner.hide();
          this.escrows = data
            .map(s => s.escrows)
            .map(sub => {
              console.log(sub.key, 'sub');
              return sub[0];
            });
          console.log(this.escrows, 'maped  this.escrows');
        });
      } else {
        this.apiService.getAllEscrows().subscribe(s => {
          this.escrows = s;
          this.setPage(1);
          console.log(this.escrows);
        });
      }
    });
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
    this.pager = this.pagerService.getPager(1, page);
    // get current page of items
    this.pagedItems = this.escrows.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.pages = this.pager.pages;
  }
}
