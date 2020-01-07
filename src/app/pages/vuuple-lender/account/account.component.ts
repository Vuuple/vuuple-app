import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { AuthService } from '../../../auth/core/auth.service';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';
import { Web3Service } from '../../../providers/web3/web3.service';
import { TokenService } from '../../../providers/token/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'] ,
  providers: [
    TokenService,
    Web3Service,
    LendersFactoryService,
    LendersRegistrationService,
    LenderEscrowService
  ]
})
export class AccountComponent implements OnInit {
  renew;
  statment = [];
  cuurentUser: any;
  totalRedeem : number;
  totalPurchase : number;
  accountContract: any;
  tokensInContract: any;
  rentedStorage: any;
  tokensAmountInContract: any;
  tokensInUse: any;
  content: string;
  constructor(private apiService : ServerApiService ,
              private authService: AuthService ,
              private lendersFactoryService : LendersFactoryService ,
              private lenderEscrowService: LenderEscrowService,
              private lendersRegistrationService: LendersRegistrationService,
              private web3Service: Web3Service ,
              private tokenService: TokenService,
    ) {
  }

  ngOnInit() {
    this.cuurentUser = this.authService.currentUser;
    // this.spinner.show();
    this.getContractDate();
    this.getStatment();
  }
  async getContractDate() {
    this.accountContract = await this.lendersFactoryService.getLenderContract(
      this.cuurentUser.ethAddress
    );
    this.cuurentUser.balance = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );

    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      console.log(this.accountContract, ' this.accountContract');

      this.rentedStorage = await this.lendersRegistrationService.getRentedStorage(
        this.accountContract
      );
      this.cuurentUser.renewalDate = await this.lendersRegistrationService.getRenewalDate(
        this.accountContract
      );
      if (this.cuurentUser.renewalDate != 0) {
        this.cuurentUser.renewalDate.setMonth(
          this.cuurentUser.renewalDate.getMonth() + 1
        );
      }
      const owner = await this.lendersRegistrationService.getContractOwner(
        this.accountContract
      );
      // this.spinner.hide();
      console.log(owner, 'this.cuurentUser.tokenAmount');

      console.log(this.cuurentUser, 'node');
    }
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
