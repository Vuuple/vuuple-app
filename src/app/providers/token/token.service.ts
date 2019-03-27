import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
declare let require: any;
import Web3 from 'web3';

const VuupleToken = require('../../../../build/contracts/VuupleToken.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class TokenService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  token = contract(VuupleToken);
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
    this.token.setProvider(this.web3.currentProvider);

    this.getCurrentAccount();
  }
  // async getCurrentAccount() {
  //   console.log('this.account', this.account);

  //   return await this.getaccounts();
  // }
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
  async mint(to, amount) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.mint(to, amount, {
          from: this.account,
          gas: 200000
        });
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
  async transferFrom(from, to, value) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.transferFrom(from, to, value, {
          from: this.account,
          gas: 200000
        });
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
  async addMinter(newMinter) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.addMinter(newMinter, {
          from: this.account,
          gas: 200000
        });
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
  async decreaseApproval(spender, value) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.decreaseApproval(spender, value, {
          from: this.account,
          gas: 200000
        });
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
  async increaseApproval(spender, value) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.increaseApproval(spender, value, {
          from: this.account,
          gas: 200000
        });
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
  async approve(spender, _addedValue) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.approve(spender, _addedValue, {
          from: this.account,
          gas: 200000
        });
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
  async decreaseAllowance(spender, subtractedValue) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.decreaseAllowance(spender, subtractedValue, {
          from: this.account,
          gas: 200000
        });
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
  async increaseAllowance(spender, addedValue) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.increaseAllowance(spender, addedValue, {
          from: this.account,
          gas: 200000
        });
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
  async transfer(to, value) {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.transfer(to, value, {
          from: this.account,
          gas: 200000
        });
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
  async renounceMinter() {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.renounceMinter({
          from: this.account,
          gas: 200000
        });
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
  async finishMinting() {
    const result = await this.token
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.finishMinting({
          from: this.account,
          gas: 200000
        });
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
  async getTotalSupply() {
    console.log('totalSupply');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.totalSupply.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getCap() {
    console.log('decimals');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.cap.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getdecimals() {
    console.log('decimals');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.decimals.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }

  async getName() {
    console.log('decimals');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.name.call();
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
  async isMintingFinished() {
    console.log('decimals');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.mintingFinished.call();
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
  async getSymbol() {
    console.log('decimals');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.symbol.call();
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
  async getBalanceOf(account) {
    console.log('balanceOf');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        return instance.balanceOf.call(account);
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
    return result;
  }
  async getAllowance(owner, spender) {
    console.log('balanceOf');
    const result = await this.token
      .deployed()
      .then(instance => {
        //
        return instance.allowance.call(owner, spender);
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');
        return rs.toNumber();
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
  async approvalEvent() {
    return await this.token
      .Approval({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
  // async mintFinishedEvent() {
  //   return await this.token
  //     .MintFinished({}, { fromBlock: 0, toBlock: 'latest' })
  //     .get((error, eventResult) => {
  //       if (error) {
  //         return error;
  //       } else {
  //         return JSON.stringify(eventResult);
  //       }
  //     });
  // }
  // async mintEvent() {
  //   return await this.token
  //     .Mint({}, { fromBlock: 0, toBlock: 'latest' })
  //     .get((error, eventResult) => {
  //       if (error) {
  //         return error;
  //       } else {
  //         return JSON.stringify(eventResult);
  //       }
  //     });
  // }
  async transferEvent() {
    return await this.token
      .Transfer({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
  async minterRemovedEvent() {
    return await this.token
      .MinterRemoved({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
  async minterAddedEvent() {
    return await this.token
      .MinterAdded({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
}
