import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-company-renter',
  templateUrl: './company-renter.component.html',
  styleUrls: ['./company-renter.component.scss']
})
export class CompanyRenterComponent implements OnInit {
  data;
  constructor(private apiService: ServerApiService) {}
  ngOnInit() {
    this.apiService.getUsersByCategory('renter').subscribe(s => {
      this.data = s;
    });
  }
}
