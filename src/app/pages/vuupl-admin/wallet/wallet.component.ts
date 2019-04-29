import { AuthService } from './../../../auth/core/auth.service';
import { TokenService } from './../../../providers/token/token.service';
import { Component, OnInit } from '@angular/core';
import { VuuplAdminService } from '../../../providers/vuuple-admin/vuupl-admin.service';
import { Web3Service } from '../../../providers/web3/web3.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [TokenService, VuuplAdminService, Web3Service]
})
export class WalletComponent implements OnInit {
  avialableTokens;
  tokensInUse = 0;
  tokensRedeemd = '3.3';
  faitCurrencyInAccount = '3.3';
  cuurentUser;
  accountContract;
  constructor(
    private adminService: VuuplAdminService,
    private web3Service: Web3Service,

    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getBlance();
    // this.apiService.getEscrowsByUserId(this.cuurentUser.id).subscribe(data => {
    //   const escrows = data;
    //   console.log(escrows);
    // });
  }
  async getBlance() {
    this.cuurentUser = await this.adminService.getCurrentAccount();

    this.avialableTokens = await this.tokenService.getBalanceOf(
      this.cuurentUser
    );
    const balance = await this.web3Service.getBalanceOf(this.cuurentUser);
    console.log(this.avialableTokens, 'this.avialableTokens');
    console.log(balance, 'this.balance');
  }
}
