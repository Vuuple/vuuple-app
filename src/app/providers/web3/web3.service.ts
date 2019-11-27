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
  // net = new Web3Net('ws://172.27.150.7:22000');
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
    console.log(this.accounts, ' this.accounts');

    this.account = this.accounts[0];

    return this.account;
  }
  async createAccount(passpword) {
    const newAccount = await this.web3.eth.personal.newAccount(passpword);
    console.log(newAccount, 'newAccount');

    return newAccount;
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
  async unLockAccount(address, pasword, unlock_duration_sec = 10000) {
    if (!(await this.isUnlocked(address))) {
      return await this.web3.eth.personal.unlockAccount(
        address,
        pasword,
        unlock_duration_sec
      );
    }
  }
  // async unLockAccount(address, pasword, unlock_duration_sec = 10000) {
  //   if (!(await this.isAccountLocked(address))) {
  //     return await this.web3.eth.personal.unlockAccount(
  //       address,
  //       pasword,
  //       unlock_duration_sec
  //     );
  //   }
  // }
  async getProvider() {
    return await this.web3.currentProvider;
  }

  async isAccountLocked(account) {
    try {
      const tx = await this.web3.eth.sendTransaction({
        from: account,
        to: account,
        value: 0
      });
      console.log(tx, 'tx');

      return true;
    } catch (err) {
      console.log(err, 'error in lock');

      // return err.message == 'authentication needed: password or unlock';
      return false;
    }
  }

  async isUnlocked(address) {
    try {
      const sign = await this.web3.eth.sign('', address);
      console.log(sign, 'sign');
    } catch (e) {
      console.log(e, 'error in sing');

      return false;
    }
    return true;
  }
}
