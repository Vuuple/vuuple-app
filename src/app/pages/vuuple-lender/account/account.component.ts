import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { AuthService } from '../../../auth/core/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  renew;
  statment = [];
  cuurentUser: any;
  totalRedeem : number;
  totalPurchase : number;
  constructor(private apiService : ServerApiService ,
              private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    // this.spinner.show();
    // this.getContractDate();
    this.getStatment();
  }

  getStatment() {
    this.apiService.getAllTokensUserTransaction().subscribe(data => {
      console.log(data[0], 'data');
      // this.spinner.hide();
      this.statment = data[0]['tokenTransactions'];
      // this.events = [].concat.apply([], this.allTransaction.filter(e => { return e.eventsEmitted.length > 0 })
      //   .map(m => m.eventsEmitted));
      if (this.statment.length > 0) {
        const test = this.statment
          .filter(s => {
            return s.type == 'in';
          })
          .map(s => s.tokenAmount)
          .reduce((item1, item2) => {
            return item1 + item2;
          });
        const redeem = this.statment
          .filter(s => {
            return s.status == 'approved' && s.type == 'out';
          })
          .map(s => s.tokenAmount);
        if (redeem.length > 0) {
          this.totalRedeem = redeem.reduce((item1, item2) => {
            return item1 + item2;
          });
        }

        const purchase = this.statment.filter(s => {
          return s.status == 'approved' && s.type == 'in';
        });
        if (purchase.length > 0) {
          this.totalPurchase = purchase
            .map(s => s.tokenAmount)
            .reduce((item1, item2) => {
              return item1 + item2;
            });
        }

        console.log(test, 'test');
      }

      console.log(this.totalRedeem, 'this.totalRedeem');
      console.log(this.totalPurchase, 'this.totalPurchase');
    });
  }
}
