import { Injectable } from '@angular/core';
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private accounts: string[];
  account;

  constructor() {
    this.web3 = window.web3;
  }

  async getCurrentAccount() {
    this.accounts = await this.web3.eth.getAccounts();
    if (this.accounts.length === 0) {
      alert(
        `Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`
      );
      return;
    }
    this.account = this.accounts[0];

    return this.account;
  }
  async getAccountByIndex(index) {
    this.accounts = await this.web3.eth.getAccounts();

    return this.accounts[index];
  }

  async unLockAccount(address, pasword) {
    return await this.web3.eth.personal.unlockAccount(address, pasword, 600);
  }
  async getProvider() {
    return await this.web3.currentProvider;
  }
}
