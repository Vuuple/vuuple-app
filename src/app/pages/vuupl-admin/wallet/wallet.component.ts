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
  avialableTokens = '5';
  mintedTokens;
  tokensRedeemd;
  faitCurrencyInAccount = '3.3';
  currentUser;
  accountContract;
  constructor(
    private adminService: VuuplAdminService,
    private web3Service: Web3Service,

    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getBlance();
    // this.apiService.getEscrowsByUserId(this.currentUser.id).subscribe(data => {
    //   const escrows = data;
    //   console.log(escrows);
    // });
  }
  async getBlance() {
    this.currentUser = await this.adminService.getCurrentAccount();

    this.tokensRedeemd = await this.tokenService.getBalanceOf(this.currentUser);

    this.mintedTokens = await this.tokenService.getTotalSupply();

    const balance = await this.web3Service.getBalanceOf(this.currentUser);
    console.log(this.tokensRedeemd, 'this.tokensRedeemd');
    console.log(this.mintedTokens, 'this.mintedTokens totl supply');
    console.log(balance, 'this.balance');
  }
}
