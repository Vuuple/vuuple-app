import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

const LenderRegistration = require('../../../contracts/LenderRegistration.json');

declare let require: any;
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class LendersRegistrationService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  lenderRegistration = contract(LenderRegistration);
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
    this.lenderRegistration.setProvider(this.web3.currentProvider);

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
  async renewSubscription(lenderContract, oferedSpace, owner) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .renewSubscription(oferedSpace, {
        from: owner,
        gas: 200000
      })
      .then(res => {
        this.setStatus('renewSubscription complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in renewSubscription; see log.');
      });
    return result;
  }
  async deactivateAccount(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .setActiveStatus(false, {
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('setActiveStatus complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in setActiveStatus; see log.');
      });
    return result;
  }

  async banAccount(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .setBanStatus(true, {
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('setBanStatus complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in setBanStatus; see log.');
      });
    return result;
  }
  async activateAccount(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .setActiveStatus(true, {
        from: this.account,
        gas: 4082886
      })
      .then(res => {
        this.setStatus('setActiveStatus complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in setActiveStatus; see log.');
      });
    return result;
  }
  // async setActiveStatus(lenderContract, status, owner) {
  //   const result = await this.lender_registration
  //     .at(lenderContract)
  //     .setActiveStatus(status, {
  //       from: owner,
  //       gas: 4982886
  //     })
  //     .then(res => {
  //       this.setStatus('setActiveStatus complete!');
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error in setActiveStatus; see log.');
  //     });
  //   return result;
  // }

  async addReputationalPoint(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .addReputationalPoint({
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('addReputationalPoint complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in addReputationalPoint; see log.');
      });
    return result;
  }

  async approve(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .approve({
        from: this.account,
        gas: 4982886
      })
      .then(res => {
        this.setStatus('approve complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in approve; see log.');
      });
    return result;
  }

  async setBanStatus(lenderContract, status) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .setBanStatus(status, {
        from: this.account,
        gas: 200000
      })
      .then(res => {
        this.setStatus('setBanStatus complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in setBanStatus; see log.');
      });
    return result;
  }

  async withdraw(lenderContract, owner) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .withdraw({
        from: owner,
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

  // internal function
  // async _mintToken(value, to) {
  //   const result = await this.lender_registration
  //     .deployed()
  //     .then(instance => {
  //       console.log("instance", instance);
  //
  //       return instance._mintToken(value, to);
  //     })
  //     .then(res => {
  //       this.setStatus("Transaction complete!");
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus("Error ; see log.");
  //     });
  //   return result;
  // }

  /**
   * Getter functions
   */
  async getBalance(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .getBalance.call()
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getBalance complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getBalance; see log.');
      });
    return result;
  }

  async getContractOwner(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .contractOwner.call()
      .then(rs => {
        this.setStatus('contractOwner complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getRenewalDate(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .renewalDate.call()
      .then(rs => {
        this.setStatus('renewalDate complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }
  async getEscrow(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .escrow.call()
      .then(rs => {
        this.setStatus('escrow complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getRegisterDate(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .registerDate.call()
      .then(rs => {
        this.setStatus('registerDate complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getPassingPercentage(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .PASSING_PERCENTAGE.call()
      .then(rs => {
        this.setStatus('passingPercentage complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getTargetPoints(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .TARGET_POINTS.call()
      .then(rs => {
        this.setStatus('targetPoints complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getLenderReputationPoints(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .lenderReputationPoints.call()
      .then(rs => {
        this.setStatus('lenderReputationPoints complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getRentedStorage(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .rentedStorage.call()
      .then(rs => {
        this.setStatus('rentedStorage complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async isActive(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .active.call()
      .then(rs => {
        this.setStatus('active complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getApproved(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .approved.call()
      .then(rs => {
        this.setStatus('approved complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async getBanned(lenderContract) {
    const result = await this.lenderRegistration
      .at(lenderContract)
      .banned.call()
      .then(rs => {
        this.setStatus('getBalance complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  /**
   * Event functions
   * No Events
   */
}
