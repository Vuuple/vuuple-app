import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.scss']
})
export class LenderComponent implements OnInit {
  data;
  constructor(private apiService: ServerApiService) {}
  ngOnInit() {
    this.apiService.getUsersByCategory('lender').subscribe(s => {
      this.data = s;
    });
  }
}
