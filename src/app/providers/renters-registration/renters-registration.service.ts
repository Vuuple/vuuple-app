import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

const RenterRegistration = require('../../../../build/contracts/RenterRegistration.json');

declare let require: any;
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};


@Injectable()
export class RentersRegistrationService {

  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renter_registration = contract(RenterRegistration);
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
    this.renter_registration.setProvider(this.web3.currentProvider);

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
  async renewSubscription(renteredStorage) {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.renewSubscription(renteredStorage);
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

  async addFileToStorage(bzzHash,
    fileName,
    size,
    fileType,
    bzzSchema,
    isEncrypted,
    encryptedKey) {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.addFileToStorage(bzzHash,
          fileName,
          size,
          fileType,
          bzzSchema,
          isEncrypted,
          encryptedKey);
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

  async completeSubscription() {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.completeSubscription();
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

  async setActiveStatus(status) {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.setActiveStatus(status);
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

  async setBanStatus(status) {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.setBanStatus(status);
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

  async issueRenterFilecontract() {
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance._issueRenterFilecontract();
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
  async getBalance() {
    console.log('decimals');
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getBalance.call();
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

  async getRenterFiles() {
    console.log('decimals');
    const result = await this.renter_registration
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getRenterFiles.call();
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
