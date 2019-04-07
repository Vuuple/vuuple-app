import { ServerApiService } from './../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(private apiService: ServerApiService) {
    this.data = {
      labels: ['Storage', 'Tokens', 'Users'],
      datasets: [
        {
          data: [120, 120, 120],
          backgroundColor: ['#0077b5', '#29ABE2', '#3584ad'],
          hoverBackgroundColor: ['#0077b5', '#29ABE2', '#3584ad']
        }
      ]
    };
  }
  ngOnInit() {}
  getData() {
    const users = this.apiService.getAllUsers().subscribe(s => {
      console.log(s, 'users');

      return s;
    });
  }
}
