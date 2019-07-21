import { RenterRegisterationService } from './../../../providers/renter-registration/renter-registeration.service';
import { RenterEscrowService } from './../../../providers/renter-escrow/renter-escrow.service';
import { AuthService } from './../../../auth/core/auth.service';
import { TokenService } from './../../../providers/token/token.service';
import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../../../providers/server-api/server-api.service';
import { LendersFactoryService } from '../../../providers/lenders-factory/lenders-factory.service';
import { RenterFactoryService } from '../../../providers/renter-factory/renter-factory.service';
import { LenderEscrowService } from '../../../providers/lenders-escrow/lenders-escrow.service';
import { LendersRegistrationService } from '../../../providers/lenders-registration/lenders-registration.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [
    TokenService,
    LendersFactoryService,
    RenterFactoryService,
    LenderEscrowService,
    RenterRegisterationService,
    LendersRegistrationService,
    RenterEscrowService
  ]
})
export class WalletComponent implements OnInit {
  avialableTokens;
  tokensInUse = 0;
  tokensRedeemd = 0;
  tokensPurchase = 0;
  cuurentUser;
  accountContract;
  constructor(
    private apiService: ServerApiService,
    private lendersFactoryService: LendersFactoryService,
    private rentersFactoryService: RenterFactoryService,
    private lenderEscrowService: LenderEscrowService,
    private renterEscrowService: RenterEscrowService,
    private lendersRegistrationService: LendersRegistrationService,
    private rentersRegistrationService: RenterRegisterationService,

    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.getCuurentUser();
    this.getBlance();
    this.getStatment();
    // this.apiService.getEscrowsByUserId(this.cuurentUser.id).subscribe(data => {
    //   const escrows = data;
    //   console.log(escrows);
    // });

    if (this.cuurentUser.category == 'renter') {
      this.getRenterData();
    } else if (this.cuurentUser.category == 'lender') {
      this.getLenderData();
    }
  }
  async getBlance() {
    this.avialableTokens = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );
    console.log(this.avialableTokens, 'this.avialableTokens');
  }
  async getLenderData() {
    this.accountContract = await this.lendersFactoryService.getLenderContract(
      this.cuurentUser.ethAddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      const escrowAddress = await this.lendersRegistrationService.getEscrow(
        this.accountContract
      );
      await this.getLenderEscrow(escrowAddress);
    }
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    if (this.accountContract != '0x0000000000000000000000000000000000000000') {
      const escrowAddress = await this.rentersRegistrationService.getEscrow(
        this.accountContract
      );
      await this.getRenterEscrow(escrowAddress);
    }
  }
  async getLenderEscrow(address) {
    this.tokensInUse += await this.lenderEscrowService.getTokenAmount(address);
  }
  async getRenterEscrow(address) {
    this.tokensInUse += await this.renterEscrowService.getTokenAmount(address);
  }

  getStatment() {
    this.apiService.getAllTokensUserTransaction().subscribe(data => {
      console.log(data[0], 'data');

      const statment = data[0]['tokenTransactions'];
      // this.events = [].concat.apply([], this.allTransaction.filter(e => { return e.eventsEmitted.length > 0 })
      //   .map(m => m.eventsEmitted));
      const test = statment
        .filter(s => {
          return s.type == 'in';
        })
        .map(s => s.tokenAmount)
        .reduce((item1, item2) => {
          return item1 + item2;
        });
      const redeem = statment
        .filter(s => {
          return s.status == 'approved' && s.type == 'in';
        })
        .map(s => s.tokenAmount);
      if (redeem.length > 0) {
        this.tokensRedeemd = redeem.reduce((item1, item2) => {
          return item1 + item2;
        });
      }

      const purchase = statment.filter(s => {
        return s.status == 'approved' && s.type == 'out';
      });
      if (purchase.length > 0) {
        this.tokensPurchase = purchase
          .map(s => s.tokenAmount)
          .reduce((item1, item2) => {
            return item1 + item2;
          });
      }

      console.log(test, 'test');
      console.log(this.tokensRedeemd, 'this.tokensRedeemd');
      console.log(this.tokensPurchase, 'this.tokensPurchase');
    });
  }
}
