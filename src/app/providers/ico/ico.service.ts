import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';

declare let require: any;
const VuupleICO = require('../../../../build/contracts/VuupleICO.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable({
  providedIn: 'root'
})
export class IcoService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  crowdsale = contract(VuupleICO);
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
    this.crowdsale.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
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
  async buyTokens(_beneficiary, _value) {
    const result = await this.crowdsale
      .deployed()
      .then(instance => {
        console.log('bignumber', _beneficiary);

        return instance.buyTokens(
          this.account,

          {
            from: this.account,
            value: _value
          }
        );
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
  // async changeRate(_newRate) {
  //   const result = await this.crowdsale
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);

  //       return instance.changeRate(_newRate, {
  //         from: this.account,
  //         gas: 200000
  //       });
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

  // async finish() {
  //   const result = await this.crowdsale
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);

  //       return instance.finish({
  //         from: this.account,
  //         gas: 200000
  //       });
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
   * General functions
   */
  async getCap() {
    console.log('decimals');
    const result = await this.crowdsale
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
  // async getOwner() {
  //   console.log('decimals');
  //   const result = await this.crowdsale
  //     .deployed()
  //     .then(instance => {
  //       //
  //       console.log('instance', instance);

  //       return instance.owner.call();
  //     })
  //     .then(rs => {
  //       console.log('rs', rs);
  //       this.setStatus('Transaction complete!');

  //       return rs;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  //   return result;
  // }

  // async getCapReached() {
  //   console.log('decimals');
  //   const result = await this.crowdsale
  //     .deployed()
  //     .then(instance => {
  //       //
  //       console.log('instance', instance);

  //       return instance.capReached.call();
  //     })
  //     .then(rs => {
  //       console.log('rs', rs);
  //       this.setStatus('Transaction complete!');

  //       return rs;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error sending coin; see log.');
  //     });
  //   return result;
  // }
  async getWallet() {
    console.log('decimals');
    const result = await this.crowdsale
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.wallet.call();
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

  async getToken() {
    console.log('decimals');
    const result = await this.crowdsale
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.token.call();
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
  async getRate() {
    console.log('decimals');
    const result = await this.crowdsale
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.rate.call();
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

  async getWeiRaised() {
    console.log('decimals');
    const result = await this.crowdsale
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.weiRaised.call();
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
  async tokenPurchaseEvent() {
    return await this.crowdsale
      .TokensPurchased({}, { fromBlock: 0, toBlock: 'latest' })
      .get((error, eventResult) => {
        if (error) {
          return error;
        } else {
          return JSON.stringify(eventResult);
        }
      });
  }
}
/**rate: ƒ ()
send: ƒ (value)
sendTransaction: ƒ ()
token: ƒ ()
transactionHash: null
wallet: ƒ ()
weiRaised: ƒ () */
