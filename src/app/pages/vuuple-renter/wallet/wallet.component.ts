import { AuthService } from './../../../auth/core/auth.service';
import { TokenService } from './../../../providers/token/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [TokenService]
})
export class WalletComponent implements OnInit {
  avialableTokens = '4';
  tokensInUse = '5';
  tokensRedeemd = '3.3';
  faitCurrencyInAccount = '3.3';
  cuurentUser;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.getCuurentUser();
    this.getBlance();
  }
  async getBlance() {
    this.avialableTokens = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );
    console.log(this.avialableTokens, 'this.avialableTokens');
  }
}
