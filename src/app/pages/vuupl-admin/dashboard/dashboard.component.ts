import { TokenService } from './../../../providers/token/token.service';
import { ServerApiService } from './../../../providers/server-api/server-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [TokenService]
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  dataSet = [];
  userCount;
  freeStorage;
  totalStorage;
  usedStorage;
  tokenCount;
  constructor(
    private apiService: ServerApiService,
    private tokenService: TokenService ,
    private api : ServerApiService
  ) {
    // this.api.getAllUsers().subscribe(
    //   res => console.log(res)
    // )
    this.data = {
      labels: ['Storage', 'Tokens', 'Users'],
      datasets: [
        {
          data: this.dataSet,
          backgroundColor: ['#0077b5', '#29ABE2', '#3584ad'],
          hoverBackgroundColor: ['#0077b5', '#29ABE2', '#3584ad']
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
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiService.getUsedSpace().subscribe(s => {
      console.log(s, 'users');

      s = this.usedStorage;
    });
    this.apiService.getFreeSpace().subscribe(s => {
      console.log(s, 'users');

      s = this.freeStorage;
    });
    this.apiService.getAllSpace().subscribe(s => {
      console.log(s, 'users');

      s = this.totalStorage;
      this.dataSet.push(s);
    });
    this.tokenService.getTotalSupply().then(s => {
      console.log(s, 'users');

      s = this.tokenCount;
      this.dataSet.push(s);
    });

    this.apiService.getCount().subscribe(s => {
      console.log(s, 'users');

      s = this.userCount;
      this.dataSet.push(s);
    });
  }
}
