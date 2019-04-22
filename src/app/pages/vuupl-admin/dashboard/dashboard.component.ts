import { ServerApiService } from './../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;

  constructor(private apiService: ServerApiService) {
    this.data = {
      labels: ['Storage', 'Tokens', 'Users'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#0077b5', '#29ABE2', '#3584ad'],
          hoverBackgroundColor: ['#0077b5', '#29ABE2', '#3584ad'],
        }
      ]    
    };
    this.options = {
    /*  title: {
          display: true,
          text: 'My Title',
          fontSize: 16
      },*/
      legend: {
          position: 'top'
      },
    tooltips: {
      enabled: true
     },
     animation: {
      animateScale: true,
      animateRotate: true
  },
  pieceLabel: {
    render: 'value' //show values
 }
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
