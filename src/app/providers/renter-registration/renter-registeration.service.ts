import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let require: any;
const RenterRegistration = require('../../../contracts/RenterRegistration.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class RenterRegisterationService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renterRegistration = contract(RenterRegistration);
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
    this.renterRegistration.setProvider(this.web3.currentProvider);

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
   * Setter functions
   */
  async renewSubscription(renterContract, _renteredStorage) {
    const result = await this.renterRegistration
      .at(renterContract)
      .renewSubscription(_renteredStorage, {
        from: this.account,
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

  async addFileToStorage(
    renterContract,
    bzzHash,
    fileName,
    size,
    fileType,
    bzzSchema,
    isEncrypted,
    encryptedKey
  ) {
    const result = await this.renterRegistration
      .at(renterContract)
      .addFileToStorage(
        bzzHash,
        fileName,
        size,
        fileType,
        bzzSchema,
        isEncrypted,
        encryptedKey,
        {
          from: this.account,
          gas: 4082886
        }
      )
      .then(res => {
        this.setStatus('addFileToStorage complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in addFileToStorage; see log.');
      });
    return result;
  }

  async completeSubscription(renterContract, account) {
    const result = await this.renterRegistration
      .at(renterContract)
      .completeSubscription({
        from: account,
        gas: 4082886
      })
      .then(res => {
        this.setStatus('completeSubscription complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in completeSubscription; see log.');
      });
    return result;
  }

  async deactivateAccount(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
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

  async banAccount(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
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
  async activateAccount(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
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

  async unbanAccount(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .setBanStatus(false, {
        from: this.account,
        gas: 4082886
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

  /**
   * Getter functions
   */
  async getEscrow(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .escrow.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('escrow complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getBalance; see log.');
      });
    return result;
  }
  async getBalance(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .getBalance.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getBalance complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getBalance; see log.');
      });
    return result;
  }

  async getRenterFiles(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .getRenterFiles.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getRenterFiles complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenterFiles; see log.');
      });
    return result;
  }

  async getContractOwner(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .contractOwner.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getContractOwner complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getContractOwner; see log.');
      });
    return result;
  }

  async getMembershipType(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .membershipType.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getMembershipType complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getMembershipType; see log.');
      });
    return result;
  }

  async getRenewalDate(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .renewalDate.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getRenewalDate complete!');

        return new Date(rs.toNumber() / 1000000);
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenewalDate; see log.');
      });
    return result;
  }

  async getRegisterDate(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .registerDate.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getRegisterDate complete!');

        return new Date(rs.toNumber() / 1000000);
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRegisterDate; see log.');
      });
    return result;
  }

  async getRenteredStorage(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .renteredStorage.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getRenteredStorage complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenteredStorage; see log.');
      });
    return result;
  }

  async getUsedStorage(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .usedStorage.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getUsedStorage complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getUsedStorage; see log.');
      });
    return result;
  }

  async getTokenAmount(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .tokenAmount.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getTokenAmount complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getTokenAmount; see log.');
      });
    return result;
  }

  async getCurrentStatus(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .currentStatus.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getCurrentStatus complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getCurrentStatus; see log.');
      });
    return result;
  }

  async isActive(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .active.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('isActive complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in isActive; see log.');
      });
    return result;
  }

  async isBanned(renterContract) {
    const result = await this.renterRegistration
      .at(renterContract)
      .banned.call()
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('isBanned complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in isBanned; see log.');
      });
    return result;
  }
}
