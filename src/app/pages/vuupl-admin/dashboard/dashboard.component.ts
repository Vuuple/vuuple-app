import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor() {
    this.data = {
      labels: ['Storage','Tokens', 'Users'],
      datasets: [
        {
          data: [120, 120, 120],
          backgroundColor: [
            "#0077b5",
            "#29ABE2",
            "#3584ad"
          ],
          hoverBackgroundColor: [
            "#0077b5",
            "#29ABE2",
            "#3584ad"
          ]
        }],
    };
  }
  ngOnInit() {

  }
}
