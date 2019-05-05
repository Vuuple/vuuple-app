import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let require: any;
const VuupleAdmins = require('../../../contracts/VuupleAdmins.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class VuuplAdminService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  vuuple_admin = contract(VuupleAdmins);
  status: string;

  constructor() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    this.web3 = window.web3;
    console.log(this.web3.version);

    this.onReady();
  }

  /**
   * General functions
   */
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.vuuple_admin.setProvider(this.web3.currentProvider);

    this.getCurrentAccount();
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

  async getCurrentProvider() {
    return await this.web3.currentProvider;
  }

  setStatus(message: string) {
    this.status = message;
  }
  /**
   * Setter functions
   */

  async addVuupleAdmin(account) {
    const result = await this.vuuple_admin
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.addVuupleAdmin(account, {
          from: this.account,
          gas: '200000'
        });
      })
      .then(res => {
        this.setStatus('This address is now an Admin');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }
  async renounceVuupleAdmin(account) {
    const result = await this.vuuple_admin
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.renounceVuupleAdmin({
          from: this.account,
          gas: '200000'
        });
      })
      .then(res => {
        this.setStatus('This address has been removed');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  /**
   * Getter functions
   */
  async isVuupleAdmin(admin) {
    const result = await this.vuuple_admin
      .deployed()
      .then(instance => {
        return instance.isVuupleAdmin.call(admin);
      })
      .then(rs => {
        this.setStatus('Transaction complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }
}
