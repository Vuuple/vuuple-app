import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let require: any;
const RenterEscrow = require('../../../contracts/RenterEscrow.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class RenterEscrowService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renterEscrow = contract(RenterEscrow);
  status: string;

  constructor() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    this.web3 = window.web3;
    console.log(this.web3, ' this.web3');

    this.onReady();
  }

  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.renterEscrow.setProvider(this.web3.currentProvider);

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
  async withdraw(address) {
    const result = await this.renterEscrow
      .at(address)
      .withdraw({
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('withdraw complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in withdraw; see log.');
      });
    return result;
  }

  /**
   * Getter functions
   */
  async getVuupleAdmin(address) {
    console.log('getVuupleAdmin');
    const result = await this.renterEscrow
      .at(address)
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.vuupleAdmin.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getVuupleAdmin complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getVuupleAdmin; see log.');
      });
    return result;
  }

  async getVuupleToken(address) {
    console.log('getVuupleToken');
    const result = await this.renterEscrow
      .at(address)
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.vuupleToken.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getVuupleToken complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getVuupleToken; see log.');
      });
    return result;
  }
  async isActive(address) {
    const result = await this.renterEscrow
      .at(address)
      .isActive.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('isActive complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in isActive; see log.');
      });
    return result;
  }

  async getEscrowStatus(address) {
    const result = await this.renterEscrow
      .at(address)
      .escrowStatus.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getEscrowStatus complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getEscrowStatus; see log.');
      });
    return result;
  }

  async getCloseTime(address) {
    const result = await this.renterEscrow
      .at(address)
      .closeTime.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getCloseTime complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getCloseTime; see log.');
      });
    return result;
  }

  async getRenterAccountContract(address) {
    const result = await this.renterEscrow
      .at(address)
      .renterAccountContract.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getRenterAccountContract complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenterAccountContract; see log.');
      });
    return result;
  }

  async getRenter(address) {
    const result = await this.renterEscrow
      .at(address)
      .renter.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getRenter complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenter; see log.');
      });
    return result;
  }

  async getTokenAmount(address) {
    const result = await this.renterEscrow
      .at(address)
      .tokenAmount.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getTokenAmount complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getTokenAmount; see log.');
      });
    return result;
  }
}
