import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let require: any;
const RenterFiles = require('../../../contracts/RenterFiles.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class RenterFilesService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renterFiles = contract(RenterFiles);
  status: string;

  constructor() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    this.web3 = window.web3;
    console.log(this.web3, ' this.web3');

    this.onReady();
  }

  /**
   * General functions
   */
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.renterFiles.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
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
   * Getter functions
   */
  async getFileByName(getRenterFiles, _fileName) {
    const result = await this.renterFiles
      .at(getRenterFiles)
      .getFileByName.call(_fileName)
      .then(rs => {
        console.log('rs getFileByName', rs);
        this.setStatus('getFileByName complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getFileByName; see log.');
      });
    return result;
  }

  async getFileByHash(getRenterFiles, bzzHash) {
    const result = await this.renterFiles
      .at(getRenterFiles)
      .getFileByHash.call(bzzHash)
      .then(rs => {
        console.log('rs getFileByHash', rs);
        this.setStatus('getFileByHash complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getFileByHash; see log.');
      });
    return result;
  }

  async getFileHashByName(getRenterFiles, name) {
    const result = await this.renterFiles
      .at(getRenterFiles)
      .getFileHashByName.call(name)
      .then(rs => {
        console.log('rs getFileHashByName', rs);
        this.setStatus('getFileHashByName complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getFileHashByName; see log.');
      });
    return result;
  }

  async getFileOwner(getRenterFiles) {
    const result = await this.renterFiles
      .at(getRenterFiles)
      .fileOwner.call()
      .then(rs => {
        console.log('rs getFileOwner', rs);
        this.setStatus('getFileOwner complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getFileOwner; see log.');
      });
    return result;
  }

  async getParentContract(getRenterFiles) {
    const result = await this.renterFiles
      .at(getRenterFiles)
      .parentContract.call()
      .then(rs => {
        console.log('rs getParentContract', rs);
        this.setStatus('getParentContract complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getParentContract; see log.');
      });
    return result;
  }
}
