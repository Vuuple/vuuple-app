import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

const RenterFiles = require('../../../../resources/build/contracts/RenterFiles.json');

declare let require: any;
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class RentersFilesService {

  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renter_files = contract(RenterFiles);
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
    this.renter_files.setProvider(this.web3.currentProvider);

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
  async addFile(bzzHash,
    fileName,
    size,
    fileType,
    bzzSchema,
    isEncrypted,
    encryptedKey) {
    const result = await this.renter_files
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.addFile(bzzHash,
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

  async destroy() {
    const result = await this.renter_files
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.destroy();
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
  async getFileByName(name) {
    console.log('decimals');
    const result = await this.renter_files
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getFileByName.call(name);
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

  async getFileByHash(bzzHash) {
    console.log('decimals');
    const result = await this.renter_files
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getFileByHash.call(bzzHash);
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

  async getFileHashByName(name) {
    console.log('decimals');
    const result = await this.renter_files
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getFileHashByName.call(name);
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
