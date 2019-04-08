import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-individual-renter',
  templateUrl: './individual-renter.component.html',
  styleUrls: ['./individual-renter.component.scss']
})
export class IndividualRenterComponent implements OnInit {
  data;
  constructor(private apiService: ServerApiService) {}
  ngOnInit() {
    this.apiService.getUsersByCategory('renter').subscribe(s => {
      this.data = s;
    });
  }
}
