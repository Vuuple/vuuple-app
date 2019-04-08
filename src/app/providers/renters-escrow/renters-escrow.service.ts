import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

const RenterEscrow = require('../../../contracts/RenterEscrow.json');

declare let require: any;
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class RentersEscrowService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renter_escrow = contract(RenterEscrow);
  status: string;

  constructor() {
    this.web3 = window.web3;
    console.log(this.web3);
    this.onReady();
  }

  /**
   * General functions
   */
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.renter_escrow.setProvider(this.web3.currentProvider);

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

  getCurrentProvider() {
    return this.web3.currentProvider;
  }

  setStatus(message: string) {
    this.status = message;
  }

  /**
   * Setter functions
   */
  async withdraw() {
    const result = await this.renter_escrow
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.withdraw();
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async closeEscrow() {
    const result = await this.renter_escrow
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.closeEscrow();
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async burn(tokenAmount) {
    const result = await this.renter_escrow
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance._burn(tokenAmount);
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  /**
   * Getter functions
   */
  async isActive() {
    console.log('decimals');
    const result = await this.renter_escrow
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.isActive.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  /**
   * Event functions
   */
}
