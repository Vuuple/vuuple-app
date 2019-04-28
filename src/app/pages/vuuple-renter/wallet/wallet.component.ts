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
  tokensRedeemd = '3.3';
  faitCurrencyInAccount = '3.3';
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
    const escrowAddress = await this.lendersRegistrationService.getEscrow(
      this.accountContract
    );
    await this.getLenderEscrow(escrowAddress);
  }
  async getRenterData() {
    this.accountContract = await this.rentersFactoryService.getRenterContract(
      this.cuurentUser.ethAddress
    );
    const escrowAddress = await this.rentersRegistrationService.getEscrow(
      this.accountContract
    );
    await this.getRenterEscrow(escrowAddress);
  }
  async getLenderEscrow(address) {
    this.tokensInUse += await this.lenderEscrowService.getTokenAmount(address);
  }
  async getRenterEscrow(address) {
    this.tokensInUse += await this.renterEscrowService.getTokenAmount(address);
  }
}
