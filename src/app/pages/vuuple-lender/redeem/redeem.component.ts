import { AuthService } from './../../../auth/core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from './../../../providers/token/token.service';
import { IcoService } from '../../../providers/ico/ico.service';
import { ServerApiService } from '../../../providers/server-api/server-api.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss'],
  providers: [TokenService, IcoService, ServerApiService]
})
export class RedeemComponent implements OnInit {
  rate = 0;
  avialableTokens = 0;
  redForm: FormGroup;
  cuurentUser;
  adminAddress = '0x9186eb3d20cbd1f5f992a950d808c4495153abd5';
  constructor(
    private formBuilder: FormBuilder,
    private icoService: IcoService,
    private serverApiService: ServerApiService,
    private authService: AuthService,

    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.cuurentUser = this.authService.getCuurentUser();

    this.redForm = this.formBuilder.group({
      tokensToRed: ['', Validators.required]
    });
    this.getRate();
  }

  async redeemTokens() {
    if (this.redForm.invalid) {
      return;
    }
    const transfer = await this.tokenService.transfer(
      this.adminAddress,
      this.redForm.value.tokensToRed
    );
    console.log(transfer, 'tokens redeemed');
    this.requestRedeem(transfer, this.redForm.value.tokensToRed);
  }
  async getRate() {
    this.rate = await this.icoService.getRate();
  }

  requestRedeem(ethTxHash, tokenAmount) {
    const body = {
      //   ethTxHash: ethTxHash,
      ethTxHash: ethTxHash,

      tokenAmount: tokenAmount,
      rate: this.rate,
      depositAmount: this.rate * tokenAmount
    };
    this.serverApiService.redeem(body).subscribe(data => {
      console.log(data);
    });
  }
  async getBlance() {
    this.avialableTokens = await this.tokenService.getBalanceOf(
      this.cuurentUser.ethAddress
    );
    console.log(this.avialableTokens, 'this.avialableTokens');
  }
}
