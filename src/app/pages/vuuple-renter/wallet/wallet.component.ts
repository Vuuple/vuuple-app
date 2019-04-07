import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  avialableTokens="4";
  tokensInUse="5";
  tokensRedeemd="3.3";
  faitCurrencyInAccount="3.3";
  constructor() { 
    this.avialableTokens;
    this.tokensInUse;
    this.tokensRedeemd;
    this.faitCurrencyInAccount;
  }

  ngOnInit() {
  }

}
