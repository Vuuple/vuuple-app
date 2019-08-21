import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';
declare let require: any;

const LenderEscrow = require('../../../contracts/LenderEscrow.json');

declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class LenderEscrowService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  lender_escrow = contract(LenderEscrow);
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
    this.lender_escrow.setProvider(this.web3.currentProvider);

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
    // return this.account;
    return '0xed9d02e382b34818e88b88a309c7fe71e65f419d';
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
  async withdraw(accountAddress) {
    const result = await this.lender_escrow
      .at(accountAddress)
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

  async closeEscrow(accountAddress) {
    const result = await this.lender_escrow
      .at(accountAddress)
      .closeEscrow({
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('closeEscrow complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in closeEscrow; see log.');
      });
    return result;
  }

  // internal functions
  // async _burn(tokenAmount) {
  //   const result = await this.lender_escrow
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);
  //
  //       return instance._burn(tokenAmount);
  //     })
  //     .then(res => {
  //       this.setStatus('Transaction complete!');
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  //   return result;
  // }
  //
  // async _transferToken(_tokenAmount) {
  //   const result = await this.lender_escrow
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);
  //
  //       return instance._transferToken(_tokenAmount);
  //     })
  //     .then(res => {
  //       this.setStatus('Transaction complete!');
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  //   return result;
  // }

  /**
   * Getter functions
   */
  async getIsActive(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .isActive.call()
      .then(rs => {
        this.setStatus('isActive complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in isActive; see log.');
      });
    return result;
  }

  async getEscrowStatus(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .escrowStatus.call()
      .then(rs => {
        this.setStatus('escrowStatus complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in escrowStatus; see log.');
      });
    return result;
  }

  async getCloseTime(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .closeTime.call()
      .then(rs => {
        this.setStatus('closeTime complete!');

        return new Date(rs.toNumber() / 1000000);
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in closeTime; see log.');
      });
    return result;
  }

  async getLenderAccountContract(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .lenderAccountContract.call()
      .then(rs => {
        this.setStatus('lenderAccountContract complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in lenderAccountContract; see log.');
      });
    return result;
  }

  async getLender(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .lender.call()
      .then(rs => {
        this.setStatus('lender complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in lender; see log.');
      });
    return result;
  }

  async getTokenAmount(escrowAddress) {
    const result = await this.lender_escrow
      .at(escrowAddress)
      .tokenAmount.call()
      .then(rs => {
        this.setStatus('tokenAmount complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in tokenAmount; see log.');
      });
    return result;
  }

  /**
   * Event functions
   * No Events
   */
}
