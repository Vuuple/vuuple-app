import { Injectable } from '@angular/core';
// const Web3Net = require('web3-net');

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
  // net = new Web3Net('ws://3.18.34.201:22000');
  constructor() {
    this.web3 = window.web3;
  }
  // async lenderRegister(rentedStorage, lender) {
  //   const result = await this.net.
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);

  //       return instance.lenderRegister(rentedStorage, {
  //         from: lender,
  //         gas: 4982886
  //       });
  //     })
  //     .then(res => {
  //       this.setStatus('Transaction complete!');
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error ; see log.');
  //     });
  //   return result;
  // }
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
  async getBalanceOf(address) {
    let balance = await this.web3.eth.getBalance(address); //Will give value in.
    // balance = this.web3.toDecimal(balance);
    return balance;
  }
  async getAccountByIndex(index) {
    this.accounts = await this.web3.eth.getAccounts();

    return this.accounts[index];
  }
  isVaildAddress(address) {
    console.log('service hit');

    return this.web3.utils.isAddress(address);
  }
  async unLockAccount(address, pasword) {
    return await this.web3.eth.personal.unlockAccount(address, pasword, 600);
  }
  async getProvider() {
    return await this.web3.currentProvider;
  }
}
